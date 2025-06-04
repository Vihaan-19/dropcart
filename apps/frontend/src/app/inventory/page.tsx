"use client";

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card } from '@/components/ui/card';
import { Package, Plus, Search, Filter, Download, AlertTriangle, TrendingUp, Edit } from 'lucide-react';

const InventoryPage = () => {
  // Sidebar navigation items (reuse from Dashboard)
  const navItems = [
    { label: "Dashboard", href: "/", icon: <Package className="w-5 h-5" /> },
    { label: "Inventory", href: "/inventory", icon: <Package className="w-5 h-5" />, active: true },
    { label: "Orders", href: "/orders", icon: <Package className="w-5 h-5" /> },
    { label: "Vendors", href: "/vendors", icon: <Package className="w-5 h-5" /> },
  ];

  const stats = [
    {
      label: "Total Products",
      value: "1,247",
      icon: <Package className="w-6 h-6 text-tomato" />,
      change: "+2.1% this week",
      changeColor: "text-green-600",
    },
    {
      label: "Low Stock",
      value: "2",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      change: "+1",
      changeColor: "text-yellow-600",
    },
    {
      label: "Out of Stock",
      value: "1",
      icon: <AlertTriangle className="w-6 h-6 text-tomato" />,
      change: "0",
      changeColor: "text-zinc-400",
    },
    {
      label: "Total Value",
      value: "$12,345",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      change: "+$500",
      changeColor: "text-green-600",
    },
  ];

  const categories = ['all', 'Electronics', 'Accessories', 'Home & Garden', 'Sports'];

  const products = [
    {
      id: 'P001',
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      vendor: 'TechCorp',
      stock: 45,
      minStock: 20,
      price: 299.99,
      lastUpdated: '2024-06-04',
      status: 'In Stock',
      image: '/placeholder.svg'
    },
    {
      id: 'P002',
      name: 'Smartphone Protective Case',
      category: 'Accessories',
      vendor: 'ProtectPro',
      stock: 8,
      minStock: 25,
      price: 49.99,
      lastUpdated: '2024-06-03',
      status: 'Low Stock',
      image: '/placeholder.svg'
    },
    {
      id: 'P003',
      name: 'Portable Bluetooth Speaker',
      category: 'Electronics',
      vendor: 'SoundWave',
      stock: 0,
      minStock: 15,
      price: 199.99,
      lastUpdated: '2024-06-02',
      status: 'Out of Stock',
      image: '/placeholder.svg'
    },
    {
      id: 'P004',
      name: 'USB-C Fast Charging Cable',
      category: 'Accessories',
      vendor: 'ChargeTech',
      stock: 120,
      minStock: 50,
      price: 29.99,
      lastUpdated: '2024-06-04',
      status: 'In Stock',
      image: '/placeholder.svg'
    },
    {
      id: 'P005',
      name: 'Wireless Mouse',
      category: 'Electronics',
      vendor: 'ClickTech',
      stock: 12,
      minStock: 25,
      price: 79.99,
      lastUpdated: '2024-06-03',
      status: 'Low Stock',
      image: '/placeholder.svg'
    }
  ];

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Low Stock': return 'text-yellow-600 bg-yellow-100';
      case 'Out of Stock': return 'text-tomato bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Helper to get stock icon
  const getStockIcon = (status: string) => {
    switch (status) {
      case 'Low Stock': return <AlertTriangle className="w-4 h-4" />;
      case 'Out of Stock': return <AlertTriangle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  // Filtered products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout navItems={navItems} title="Inventory">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Inventory Management</h1>
        <p className="text-gray-600 mt-1">Track and manage your product inventory</p>
      </div>
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            changeColor={stat.changeColor}
          />
        ))}
      </div>
      {/* Actions and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-1">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products or vendors..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tomato text-sm"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-tomato text-white rounded-lg hover:bg-red-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>
      {/* Inventory Table */}
      <Card className="p-0 overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-black">Product</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-black">Category</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-black">Vendor</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-black">Stock</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-black">Price</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-black">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-black">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">ID: {product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.vendor}</td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">{product.stock}</span>
                    <span className="text-gray-600"> / {product.minStock}</span>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className={`h-1.5 rounded-full ${
                        product.stock === 0 ? 'bg-red-500' :
                          product.stock < product.minStock ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((product.stock / product.minStock) * 100, 100)}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">${product.price}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {getStockIcon(product.status)}
                    <span>{product.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-700 mr-3">
                    <Edit className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppLayout>
  );
};

export default InventoryPage;
