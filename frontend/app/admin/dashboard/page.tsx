'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Users,
  AlertCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function AdminDashboardPage() {
  const router = useRouter();
  // TODO: Fetch real data from API
  const stats = [
    {
      label: 'Total Revenue',
      value: '$12,345',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Orders',
      value: '156',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Products',
      value: '48',
      change: '+3',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Customers',
      value: '892',
      change: '+24',
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      amount: '$125.00',
      status: 'Completed',
      date: '2024-12-13',
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      amount: '$89.50',
      status: 'Processing',
      date: '2024-12-13',
    },
    {
      id: '#ORD-003',
      customer: 'Bob Johnson',
      amount: '$210.00',
      status: 'Shipped',
      date: '2024-12-12',
    },
  ];

  const lowStockProducts = [
    { name: 'Summer Dress', stock: 3, sku: 'SD-001' },
    { name: 'Leather Handbag', stock: 5, sku: 'LH-002' },
    { name: 'Silk Scarf', stock: 2, sku: 'SS-003' },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Overview of your store performance
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Orders
              </h2>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {order.amount}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Low Stock Alert */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Low Stock Alert
                </h2>
              </div>
              <div className="space-y-4">
                {lowStockProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">{product.sku}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-800">
                        {product.stock} left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/admin/products/new')}
                className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                <Package className="w-6 h-6 mb-2" />
                <span className="font-medium">Add Product</span>
              </button>
              <button
                onClick={() => router.push('/admin/orders')}
                className="p-4 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                <ShoppingCart className="w-6 h-6 mb-2" />
                <span className="font-medium">View Orders</span>
              </button>
              <button
                onClick={() => router.push('/admin/analytics')}
                className="p-4 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                <TrendingUp className="w-6 h-6 mb-2" />
                <span className="font-medium">Analytics</span>
              </button>
            </div>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
