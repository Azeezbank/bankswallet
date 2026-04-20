"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/lib/api";
import { ModalNotification } from "@/app/components/modal/modal";
import DotLoader from "@/app/components/modal/loader";

interface UserInfo {
  d_id: number;
  username: string;
  user_email: string;
  user_balance: number;
  packages: string;
  Phone_number: string;
  Pin: number;
  fullName: string;
}

export default function UserInfoPage() {

  const { id } = useParams();

  const [amount, setAmount] = useState(0);
  const [userDetails, setUserDetails] = useState<UserInfo>({
    d_id: 0,
    username: "",
    user_email: "",
    user_balance: 0,
    packages: "",
    Phone_number: "",
    Pin: 0,
    fullName: "",
  });

  const [isNotification, setIsNotification] = useState(false);
  const [title, setTitle] = useState('');
  const [notification, setNotification] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  /* Fetch user */
  const fetchUser = async () => {

    try {

      const res = await api.get(`/user/info/${id}`, {
      });

      if (res.status === 200) {
        setUserDetails(res.data);
      }

    } catch (err) {
      console.error("Error fetching user info");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /* Update user */
  const handleUpdateUser = async (field: string, value: any) => {
setIsUpdating(true);
    try {

      const res = await api.put(
        `/user/update/${id}`,
        { fieldName: field, value },
      );

      setIsUpdating(false);
      setIsNotification(true);
      setNotification(res.data.message);
      setTitle('Success!')

      fetchUser();

    } catch (err: any) {
       setIsUpdating(false);
      setIsNotification(true);
      setNotification(err.response?.data?.message || "Something went wrong");
      setTitle('Error!');
    }
  };

  /* Fund / Deduct wallet */
  const handleWalletUpdate = async () => {

    setIsUpdating(true);

    try {

      const res = await api.post(
        `/user/fund/${id}`,
        { amount },
      );
      setIsUpdating(false);
      setIsNotification(true);
      setNotification(res.data.message);
      setTitle('Success!')

      fetchUser();

    } catch (err: any) {
      setIsUpdating(false);
      setIsNotification(true);
      setNotification(err.response?.data?.message || "Something went wrong");
      setTitle('Error!');
    }
  };

  /* Ban user */
  const handleBanUser = async () => {

    setIsUpdating(true);

    try {

      const res = await api.put(
        `/user/ban/${id}`,
        {},
      );
      setIsUpdating(false);
      setIsUpdating(false);
      setIsNotification(true);
      setNotification(res.data.message);
      setTitle('Success!')

      fetchUser();

    } catch (err: any) {
      setIsUpdating(false);
      setIsUpdating(false);
      setIsNotification(true);
      setNotification(err.response?.data?.message || "Something went wrong");
      setTitle('Error!');
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

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold">
            User Profile
          </h1>

          <p className="text-gray-500 text-sm">
            Manage user information
          </p>
        </div>

        <button
          onClick={handleBanUser}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Ban User
        </button>

      </div>

      {/* User Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <InfoCard title="Full Name" value={userDetails.fullName} />
        <InfoCard title="Email" value={userDetails.user_email} />
        <InfoCard title="Phone" value={userDetails.Phone_number} />
        <InfoCard title="Wallet Balance" value={`₦${userDetails.user_balance}`} />
        <InfoCard title="Package" value={userDetails.packages} />
        <InfoCard title="PIN" value={userDetails.Pin} />

      </div>

      {/* Update Section */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">

        <h2 className="font-semibold">
          Adjust User Information
        </h2>

        <UpdateField
          label="Full Name"
          value={userDetails.fullName}
          onChange={(v: any) =>
            setUserDetails({ ...userDetails, fullName: v })
          }
          onSave={() =>
            handleUpdateUser("fullName", userDetails.fullName)
          }
        />

        <UpdateField
          label="Email"
          value={userDetails.user_email}
          onChange={(v: any) =>
            setUserDetails({ ...userDetails, user_email: v })
          }
          onSave={() =>
            handleUpdateUser("user_email", userDetails.user_email)
          }
        />

        <UpdateField
          label="Phone"
          value={userDetails.Phone_number}
          onChange={(v: any) =>
            setUserDetails({ ...userDetails, Phone_number: v })
          }
          onSave={() =>
            handleUpdateUser("Phone_number", userDetails.Phone_number)
          }
        />

        <UpdateField
          label="PIN"
          value={String(userDetails.Pin)}
          onChange={(v: any) =>
            setUserDetails({ ...userDetails, Pin: Number(v) })
          }
          onSave={() =>
            handleUpdateUser("Pin", userDetails.Pin)
          }
        />

        <UpdateField
          label="Package"
          value={userDetails.packages}
          onChange={(v: any) =>
            setUserDetails({ ...userDetails, packages: v })
          }
          onSave={() =>
            handleUpdateUser("packages", userDetails.packages)
          }
        />

        {/* Wallet */}
        <div>

          <label className="text-sm font-medium">
            Adjust Wallet Balance
          </label>

          <div className="flex gap-3 mt-2">

            <input
              type="number"
              className="border rounded-lg p-3 w-full"
              placeholder="Use negative value to deduct"
              onChange={(e) =>
                setAmount(Number(e.target.value))
              }
            />

            <button
              onClick={handleWalletUpdate}
              className="bg-primary text-white px-5 rounded-lg"
            >
              Update
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

/* Info Card */
function InfoCard({ title, value }: any) {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h3 className="text-lg font-semibold mt-2">
        {value}
      </h3>

    </div>

  );
}

/* Update Field */
function UpdateField({ label, value, onChange, onSave }: any) {

  return (

    <div>

      <label className="text-sm font-medium">
        Modify {label}
      </label>

      <div className="flex gap-3 mt-2">

        <input
          className="border rounded-lg p-3 w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button
          onClick={onSave}
          className="bg-primary text-white px-5 rounded-lg"
        >
          Update
        </button>

      </div>

    </div>

  );
}