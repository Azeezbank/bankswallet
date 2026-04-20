"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import DotLoader from "@/app/components/modal/loader";
import { ModalNotification } from "@/app/components/modal/modal";

interface Api {
  d_id: number;
  service_type: string;
  api_key: string;
  api_url: string;
}

export default function ApiDocsPage() {

  const [serviceType, setServiceType] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiUrlValue, setApiUrlValue] = useState("");

  const [apiDocs, setApiDocs] = useState<Api[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [title, setTitle] = useState('');
  const [notification, setNotification] = useState('');


  /* Fetch API Docs */
  useEffect(() => {

    const fetchDocs = async () => {
      try {
        const res = await api.get(`/env`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setApiDocs(res.data);
        }

      } catch (err: any) {
        console.error(
          "Failed to fetch API docs",
          err.response?.data?.message || err.message
        );
      }
    };

    fetchDocs();

  }, []);

  /* Update API */
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsUpdating(true);

    try {

      const res = await api.post(
        `/env`,
        {
          service_type: serviceType,
          api_key: apiKey,
          api_url: apiUrlValue,
        },
      );

      if (res.status === 200) {
        setIsUpdating(false);
        setIsNotification(true);
        setNotification(res.data.message);
        setTitle('Success!')
      }

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
        <h1 className="text-2xl font-bold">
          API Configuration
        </h1>
        <p className="text-gray-500 text-sm">
          Manage service API credentials
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="font-semibold mb-6">
          Update API Details
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          {/* Service Type */}
          <div>
            <label className="text-sm font-medium">
              Service Type
            </label>

            <select
              className="w-full border rounded-lg p-3 mt-1"
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option>Select Service</option>
              <option>VTU</option>
              <option>SME</option>
              <option>GIFTING</option>
              <option>CORPORATE GIFTING</option>
              <option>DATA COUPON</option>
              <option>DATA SHARE</option>
              <option>SME2</option>
              <option>Gotv</option>
            </select>
          </div>

          {/* API KEY */}
          <div>
            <label className="text-sm font-medium">
              API Key
            </label>

            <input
              type="text"
              placeholder="Enter API key"
              className="w-full border rounded-lg p-3 mt-1"
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
          </div>

          {/* API URL */}
          <div>
            <label className="text-sm font-medium">
              API URL
            </label>

            <input
              type="text"
              placeholder="Enter API URL"
              className="w-full border rounded-lg p-3 mt-1"
              onChange={(e) => setApiUrlValue(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">

          <button
            onClick={handleUpdate}
            className="bg-primary cursor-pointer text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            Update API
          </button>

        </div>

      </div>

      {/* API Table */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="font-semibold mb-4">
          Existing API Configurations
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">

              <tr>
                <th className="text-left p-3">Service</th>
                <th className="text-left p-3">API Key</th>
                <th className="text-left p-3">API URL</th>
              </tr>

            </thead>

            <tbody>

              {apiDocs.map((api) => (

                <tr
                  key={api.d_id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3 font-medium">
                    {api.service_type}
                  </td>

                  <td className="p-3">
                    {api.api_key}
                  </td>

                  <td className="p-3">
                    {api.api_url}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}