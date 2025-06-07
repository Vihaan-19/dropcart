"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { ShoppingCart, Search, Filter, Eye, Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: <Package className="w-5 h-5" /> },
  { label: "Inventory", href: "/inventory", icon: <Package className="w-5 h-5" /> },
  { label: "Orders", href: "/orders", icon: <ShoppingCart className="w-5 h-5" />, active: true },
  { label: "Vendors", href: "/vendors", icon: <Package className="w-5 h-5" /> },
];

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    {
      id: "#ORD-001",
      customer: "John Smith",
      email: "john.smith@email.com",
      items: 3,
      total: 598.97,
      status: "Shipped",
      date: "2024-06-04",
      paymentStatus: "Paid",
      shippingAddress: "123 Main St, New York, NY",
      vendor: "TechCorp",
    },
    {
      id: "#ORD-002",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      items: 1,
      total: 49.99,
      status: "Processing",
      date: "2024-06-04",
      paymentStatus: "Paid",
      shippingAddress: "456 Oak Ave, Los Angeles, CA",
      vendor: "ProtectPro",
    },
    {
      id: "#ORD-003",
      customer: "Mike Wilson",
      email: "mike.wilson@email.com",
      items: 2,
      total: 399.98,
      status: "Delivered",
      date: "2024-06-03",
      paymentStatus: "Paid",
      shippingAddress: "789 Pine Rd, Chicago, IL",
      vendor: "SoundWave",
    },
    {
      id: "#ORD-004",
      customer: "Emma Davis",
      email: "emma.davis@email.com",
      items: 1,
      total: 79.99,
      status: "Pending",
      date: "2024-06-03",
      paymentStatus: "Pending",
      shippingAddress: "321 Elm St, Houston, TX",
      vendor: "ChargeTech",
    },
    {
      id: "#ORD-005",
      customer: "Alex Thompson",
      email: "alex.t@email.com",
      items: 4,
      total: 1299.96,
      status: "Cancelled",
      date: "2024-06-02",
      paymentStatus: "Refunded",
      shippingAddress: "654 Maple Dr, Phoenix, AZ",
      vendor: "TechCorp",
    },
  ];

  const statusOptions = ["all", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "text-green-600 bg-green-100";
      case "Shipped": return "text-blue-600 bg-blue-100";
      case "Processing": return "text-yellow-600 bg-yellow-100";
      case "Pending": return "text-orange-600 bg-orange-100";
      case "Cancelled": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered": return <CheckCircle className="w-4 h-4" />;
      case "Shipped": return <Truck className="w-4 h-4" />;
      case "Processing": return <Package className="w-4 h-4" />;
      case "Pending": return <Clock className="w-4 h-4" />;
      case "Cancelled": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "text-green-600 bg-green-100";
      case "Pending": return "text-yellow-600 bg-yellow-100";
      case "Refunded": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout navItems={navItems} title="Orders">
      <div className="flex flex-col gap-6">
        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-2 flex-1">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders, customers, or emails..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === "all" ? "All Status" : status}
                </option>
              ))}
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Order ID</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Customer</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Items</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Total</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Payment</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">Vendor: {order.vendor}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {order.items} items
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.date}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

