"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/lib/api";
import DotLoader from "@/app/components/modal/loader";
import { ModalNotification } from "@/app/components/modal/modal";


interface DataGate {
    d_id: number;
    id: number;
    name: string;
    network_name: string;
    data_type: string;
    validity: string;
    USER: number;
    RESELLER: number;
    API: number;
    is_active: string;
}

const DataGateway: React.FC = () => {
    const [allPlan, setAlPlan] = useState<DataGate[]>([]);
    const [dataTypeNetworkName, setDataTypeNetworkName] = useState("MTN");
    const [dataTypeName, setDataTypeName] = useState("SME");
    const [isDataTypeStatus, setIsDataTypeStatus] = useState("active");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [title, setTitle] = useState('');
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await api.get(
                    `/data/all/plan`,
                );

                if (response.status === 200) {
                    setAlPlan(response.data);
                }
            } catch (err: any) {
                console.error(err);
            }
        };

        fetchPlans();
    }, []);

    const handlePlans = (index: number, field: keyof DataGate, value: string) => {
        const newPlans = [...allPlan];
        newPlans[index] = {
            ...(newPlans[index] || {}),
            [field]: value,
        };
        setAlPlan(newPlans);
    };

    const submitPlans = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            const res = await api.put(
                `/data/update/plans`,
                allPlan,
            );

            setIsUpdating(false);
            setIsNotification(true);
            setNotification(res.data.message);
            setTitle('Success!')

        } catch (err: any) {
            setIsUpdating(false);
            setTitle('Error!');
            setNotification(err.response?.data?.message || "Something went wrong");
            setIsNotification(true);
        }
    };

    const handlePlanStatus = async () => {
        try {
            setIsUpdating(true);

            const res = await api.put(
                `/data/update/types/status`,
                {
                    dataTypeNetworkName,
                    dataTypeName,
                    isDataTypeStatus,
                },
            );

            setIsUpdating(false);
            setIsNotification(true);
            setNotification(res.data.message);
            setTitle('Success!')

        } catch (err: any) {
            setIsUpdating(false);
            setTitle('Error!');
            setNotification(err.response?.data?.message || "Something went wrong");
            setIsNotification(true);
        }
    };

    return (
        <div className="space-y-8">
            {isUpdating && (
                <DotLoader />
            )}
            {isNotification &&
                <ModalNotification
                    notification={notification} title={title}
                    onButtonClick={() => setIsNotification(false)}
                    isNotification={isNotification} />}
            {/* Page Title */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Data Gateway
                </h1>
                <p className="text-sm text-gray-500">
                    Manage data plans and gateway availability
                </p>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6">

                <h2 className="text-lg font-semibold mb-4">
                    Data Type Status
                </h2>

                <div className="grid md:grid-cols-4 gap-4">

                    <select
                        className="border rounded-lg px-3 py-2"
                        onChange={(e) => setDataTypeNetworkName(e.target.value)}
                    >
                        <option>MTN</option>
                        <option>AIRTEL</option>
                        <option>GLO</option>
                        <option>9MOBILE</option>
                    </select>

                    <select
                        className="border rounded-lg px-3 py-2"
                        onChange={(e) => setDataTypeName(e.target.value)}
                    >
                        <option>SME</option>
                        <option>GIFTING</option>
                        <option>CORPORATE GIFTING</option>
                        <option>SME2</option>
                        <option>DATA SHARE</option>
                        <option>DATA COUPON</option>
                    </select>

                    <select
                        className="border rounded-lg px-3 py-2"
                        onChange={(e) => setIsDataTypeStatus(e.target.value)}
                    >
                        <option>active</option>
                        <option>disabled</option>
                    </select>

                    <button
                        onClick={handlePlanStatus}
                        className="bg-primary text-white rounded-lg px-4 py-2 hover:opacity-90"
                    >
                        Update
                    </button>

                </div>
            </div>

            {/* Data Plans Table */}
            <div className="bg-white rounded-xl shadow-sm border">

                <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold">
                        All Data Plans
                    </h2>
                </div>

                <div className="w-full overflow-x-auto">

                    <table className="text-sm">

                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Network</th>
                                <th className="p-3 text-left">Type</th>
                                <th className="p-3 text-left">Validity</th>
                                <th className="p-3 text-left">User</th>
                                <th className="p-3 text-left">Reseller</th>
                                <th className="p-3 text-left">API</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {allPlan.map((plan, index) => (
                                <tr
                                    key={index}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-2">
                                        <input
                                            className="border rounded px-2 py-1 w-20"
                                            defaultValue={plan.id}
                                            onChange={(e) =>
                                                handlePlans(index, "id", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            className="border rounded px-2 py-1 w-40"
                                            defaultValue={plan.name}
                                            onChange={(e) =>
                                                handlePlans(index, "name", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            className="border rounded px-2 py-1 w-32"
                                            defaultValue={plan.network_name}
                                            onChange={(e) =>
                                                handlePlans(index, "network_name", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            className="border rounded px-2 py-1 w-32"
                                            defaultValue={plan.data_type}
                                            onChange={(e) =>
                                                handlePlans(index, "data_type", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            className="border rounded px-2 py-1 w-28"
                                            defaultValue={plan.validity}
                                            onChange={(e) =>
                                                handlePlans(index, "validity", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            className="border rounded px-2 py-1 w-24"
                                            defaultValue={plan.USER}
                                            onChange={(e) =>
                                                handlePlans(index, "USER", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            className="border rounded px-2 py-1 w-24"
                                            defaultValue={plan.RESELLER}
                                            onChange={(e) =>
                                                handlePlans(index, "RESELLER", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td className="p-2">
                                        <input
                                            className="border rounded px-2 py-1 w-24"
                                            defaultValue={plan.API}
                                            onChange={(e) =>
                                                handlePlans(index, "API", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td className="p-2">
                                        <select
                                            className="border rounded px-2 py-1"
                                            defaultValue={plan.is_active}
                                            onChange={(e) =>
                                                handlePlans(index, "is_active", e.target.value)
                                            }
                                        >
                                            <option>active</option>
                                            <option>disabled</option>
                                        </select>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Save Button */}
                <div className="p-6 border-t flex justify-end">

                    <button
                        onClick={submitPlans}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
                    >
                        Save Changes
                    </button>

                </div>

            </div>
        </div>
    );
};

export default DataGateway;