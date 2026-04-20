"use client";

import {
  Bell,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-app-gradient">

      {/* Main Content */}
      <main className="flex-1 p-6">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-semibold">
            Admin Dashboard
          </h1>

          <div className="flex items-center gap-4">

            <button className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient"></div>
              <span className="text-sm font-medium">
                Admin
              </span>
            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-2xl font-semibold mt-1">1,284</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Wallet Balance</p>
            <h2 className="text-2xl font-semibold mt-1">₦4,820,000</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Transactions Today</p>
            <h2 className="text-2xl font-semibold mt-1">382</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Revenue</p>
            <h2 className="text-2xl font-semibold mt-1">₦120,400</h2>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">

          <h3 className="font-semibold mb-4">
            Quick Actions
          </h3>

          <div className="grid md:grid-cols-4 gap-3">

            <button className="bg-gradient text-white rounded-lg p-3">
              Credit User Wallet
            </button>

            <button className="bg-gray-100 rounded-lg p-3">
              Manage Users
            </button>

            <button className="bg-gray-100 rounded-lg p-3">
              View Transactions
            </button>

            <button className="bg-gray-100 rounded-lg p-3">
              Send Notification
            </button>

          </div>

        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm">

          <div className="p-5 border-b">
            <h3 className="font-semibold">
              Recent Transactions
            </h3>
          </div>

          <table className="w-full text-sm">

            <thead className="text-gray-500">
              <tr>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Date</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-t">
                <td className="p-4">John Doe</td>
                <td className="p-4">Data Purchase</td>
                <td className="p-4">₦1,000</td>
                <td className="p-4 text-green-600">Success</td>
                <td className="p-4">Today</td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Mary James</td>
                <td className="p-4">Wallet Funding</td>
                <td className="p-4">₦5,000</td>
                <td className="p-4 text-green-600">Success</td>
                <td className="p-4">Today</td>
              </tr>

            </tbody>

          </table>

        </div>

      </main>
    </div>
  );
}