// app/api/purchase/bundle/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/Prisma.client";
import axios from "axios";
import { decrypt } from "@/app/utils/crypto";
import { Decimal } from "@prisma/client/runtime/library";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {
        plan,
        DataPrice,
        phone,
        network,
        choosenDataType,
        pin,
    } = body;

    const userId = Number(req.headers.get("x-user-id"));
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let wallet = new Decimal(0);
    let newBalance = new Decimal(0);


    try {
        // 1. Get user details
        const user = await prisma.users.findFirst({
            where: { d_id: userId },
            select: { packages: true, user_balance: true, Pin: true, cashback: true },
        });

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 400 });

        const Pin = parseInt(pin, 10);
        console.log("User pin", Pin);
        if (user.Pin !== Pin) {
            return NextResponse.json({ message: "Incorrect Transaction Pin" }, { status: 400 });
        }

        // 2. Determine package
        let price;
        if (user.packages === "USER") price = "USER";
        else if (user.packages === "RESELLER") price = "RESELLER";
        else if (user.packages === "API") price = "API";
        else return NextResponse.json({ message: "No package found" }, { status: 400 });

        // 3. Select data plan
        const plans = await prisma.data_plans.findMany({
            where: {
                network_name: network,
                data_type: choosenDataType,
                is_active: "active",
                [price]: DataPrice,
            },
        });

        if (!plans || plans.length === 0) {
            return NextResponse.json({ message: "Failed to select plan" }, { status: 404 });
        }
        const id = plans[0].id;

        // 4. Get network id
        const networkId = await prisma.networks.findFirst({
            where: { name: network },
            select: { id: true },
        });
        if (!networkId) return NextResponse.json({ message: "Network not found" }, { status: 404 });

        let ncNetworkId;
        if (networkId.id === 1) ncNetworkId = 1;
        else if (networkId.id === 4) ncNetworkId = 2;
        else if (networkId.id === 2) ncNetworkId = 3;
        else if (networkId.id === 3) ncNetworkId = 4;

        const ncRequestBody = {
            network: ncNetworkId,
            phone_number: phone,
            data_plan: id,
            bypass: true,
        };
        const requestBody = {
            network: networkId.id,
            mobile_number: phone,
            plan: id,
            Ported_number: true,
        };

        // 5. Get API details
        const apiDocs = await prisma.env.findFirst({
            where: { service_type: choosenDataType },
            select: { api_key: true, api_url: true },
        });

        if (!apiDocs) {
            return NextResponse.json({ message: "API not found" }, { status: 404 });
        }

        const { api_key, api_url } = apiDocs;

        if (!api_key || !api_url) {
            return NextResponse.json({ message: "Invalid Application Programming Interface credentials" }, { status: 400 });
        }

        const decryptKey = decrypt(api_key);
        const headers = { Authorization: decryptKey, "Content-Type": "application/json" };

        // 6. Wallet check
        wallet = new Decimal(user.user_balance);
        if (wallet.lt(new Decimal(DataPrice))) {
            return NextResponse.json({ message: "Insufficient wallet balance" }, { status: 400 });
        }
        newBalance = wallet.minus(new Decimal(DataPrice));

        await prisma.users.update({
            where: { d_id: userId },
            data: { user_balance: newBalance, prev_balance: wallet },
        });

        // 7. Call API
        let response;
        if (choosenDataType === "DATA SHARE") {
            response = await axios.post(api_url, ncRequestBody, { headers });
        } else {
            response = await axios.post(api_url, requestBody, { headers });
        }

        const status = response.data.Status ?? response.data.status;

        // 8. Refund if failed
        if (!response.data.Status || ["failed", "Failed", "Fail", "fail"].includes(status) || (typeof status === "number" && status >= 400)) {
            await prisma.users.update({ where: { d_id: userId }, data: { user_balance: wallet } });
            await prisma.dataTransactionHist.create({
                data: { id: userId, plan, phone_number: phone, amount: parseFloat(DataPrice), balance_before: newBalance, balance_after: wallet, status, condition: "Failed" }
            });
            return NextResponse.json({ message: "Transaction failed, wallet refunded", status }, { status: 502 });
        }

        // 9. Save transaction history
        await prisma.dataTransactionHist.create({
            data: { id: userId, plan, phone_number: phone, amount: parseFloat(DataPrice), balance_before: wallet, balance_after: newBalance, status, condition: "Successful" }
        });


        return NextResponse.json({ message: "Data purchase successful" }, { status: 200 });
    } catch (err) {
        console.error("Failed to fetch from API", err);

        await prisma.users.update({ where: { d_id: userId }, data: { user_balance: wallet } });
        await prisma.dataTransactionHist.create({
            data: { id: userId, plan, phone_number: phone, amount: new Decimal(DataPrice), balance_before: newBalance, balance_after: wallet, status: 'Failed', condition: "Failed" }
        });

        return NextResponse.json({ message: "Failed to fetch data from external API, balance refunded" }, { status: 500 });
    }
}