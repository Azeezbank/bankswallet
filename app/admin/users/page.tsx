"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";

interface UserDetails {
  d_id: number;
  username: string;
  user_email: string;
  user_balance: number;
  packages: number;
  Phone_number: number;
  Pin: number;
}

export default function UsersPage() {

  const router = useRouter();

  const [users, setUsers] = useState<UserDetails[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserDetails[]>([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [totalPage, setTotalPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  /* Fetch users */

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const res = await api.get(
          `/user/details?page=${page}&limit=${limit}`,
        );

        if (res.status === 200) {

          setUsers(res.data.data);
          setFilteredUsers(res.data.data);
          setTotalPage(res.data.totalPage);

        }

      } catch {

        console.error("Error fetching users");

      }

    };

    fetchUsers();

  }, [page, limit]);

  /* Search */

  const handleSearch = () => {

    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  return (

    <div className="space-y-6 overflow-hidden">

      {/* Header */}

      <div>

        <h1 className="text-2xl font-bold">
          Users
        </h1>

        <p className="text-gray-500 text-sm">
          Manage platform users
        </p>

      </div>

      {/* Controls */}

      <div className="bg-white p-4 rounded-xl shadow sm:flex flex-wrap items-center justify-between">
        {/* <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-4 md:items-center md:justify-between"> */}
        {/* Search */}
        <div className="flex gap-2">
          {/* <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"> */}
          <input
            type="text"
            placeholder="Search username..."
            className="border rounded-lg p-2"
            // className="border rounded-lg p-2 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-primary text-white px-4 rounded-lg"
          >
            Search
          </button>

        </div>

        {/* Page */}
        <div className="flex gap-4 justify-between">
          <div className="flex items-center gap-2">

            <span className="text-sm">
              Page
            </span>

            <select
              className="border rounded-lg p-2"
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
            >

              {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (

                <option key={p}>
                  {p}
                </option>

              ))}

            </select>

          </div>

          {/* Limit */}

          <div className="flex items-center gap-2">

            <span className="text-sm">
              Limit
            </span>

            <select
              className="border rounded-lg p-2"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >

              {[10, 20, 30, 40, 50, 100].map((l) => (

                <option key={l}>
                  {l}
                </option>

              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow w-full overflow-x-auto">

        <table className="min-w-full text-sm table-auto">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left whitespace-nowrap">ID</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Wallet</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">PIN</th>
              <th className="p-3 text-left">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user.d_id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3 whitespace-nowrap">
                  {user.d_id}
                </td>

                <td className="p-3 whitespace-nowrap">
                  {user.user_email}
                </td>

                <td className="p-3 font-medium">
                  {user.username}
                </td>

                <td className="p-3">
                  ₦{user.user_balance}
                </td>

                <td className="p-3">
                  {user.packages}
                </td>

                <td className="p-3">
                  {user.Phone_number}
                </td>

                <td className="p-3">
                  {user.Pin}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      router.push(`/admin/users/${user.d_id}`)
                    }
                    className="text-primary font-medium"
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="flex items-center justify-between mt-4">

          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm">
            Page {page} of {totalPage}
          </span>

          <button
            disabled={page === totalPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}