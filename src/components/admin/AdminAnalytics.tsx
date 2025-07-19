import React, { useState } from 'react';
import { useProducts, useOrders, useCustomers } from '../../hooks/useAPI';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const AdminAnalytics: React.FC = () => {
  const { data: products } = useProducts();
  const { data: orders } = useOrders();
  const { data: customers } = useCustomers();
  const [dateRange, setDateRange] = useState('7');

  // Calculate analytics data
  const getAnalyticsData = () => {
    const now = new Date();
    const daysAgo = parseInt(dateRange);
    const startDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));

    const filteredOrders = orders?.filter((order: any) => 
      new Date(order.createdAt) >= startDate
    ) || [];

    const filteredCustomers = customers?.filter((customer: any) => 
      new Date(customer.createdAt) >= startDate
    ) || [];

    const totalRevenue = filteredOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
    const totalOrders = filteredOrders.length;
    const totalCustomers = filteredCustomers.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Calculate growth rates (mock data for demo)
    const revenueGrowth = 12.5;
    const orderGrowth = 8.3;
    const customerGrowth = 15.2;
    const aovGrowth = 4.7;

    return {
      revenue: {
        value: totalRevenue,
        growth: revenueGrowth,
        isPositive: revenueGrowth > 0
      },
      orders: {
        value: totalOrders,
        growth: orderGrowth,
        isPositive: orderGrowth > 0
      },
      customers: {
        value: totalCustomers,
        growth: customerGrowth,
        isPositive: customerGrowth > 0
      },
      aov: {
        value: averageOrderValue,
        growth: aovGrowth,
        isPositive: aovGrowth > 0
      }
    };
  };

  const analytics = getAnalyticsData();

  // Top products by revenue
  const getTopProducts = () => {
    if (!orders || !products) return [];
    
    const productRevenue = new Map();
    
    orders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        const productId = item.product?._id;
        const revenue = item.price * item.quantity;
        productRevenue.set(productId, (productRevenue.get(productId) || 0) + revenue);
      });
    });

    return Array.from(productRevenue.entries())
      .map(([productId, revenue]) => {
        const product = products.find((p: any) => p._id === productId);
        return { product, revenue };
      })
      .filter(item => item.product)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  const topProducts = getTopProducts();

  // Order status distribution
  const getOrderStatusDistribution = () => {
    if (!orders) return [];
    
    const statusCount = orders.reduce((acc: any, order: any) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCount).map(([status, count]) => ({
      status,
      count,
      percentage: ((count as number) / orders.length * 100).toFixed(1)
    }));
  };

  const statusDistribution = getOrderStatusDistribution();

  // Revenue chart data (mock data for demo)
  const revenueChartData = [
    { name: 'Mon', revenue: 12000 },
    { name: 'Tue', revenue: 19000 },
    { name: 'Wed', revenue: 15000 },
    { name: 'Thu', revenue: 25000 },
    { name: 'Fri', revenue: 22000 },
    { name: 'Sat', revenue: 30000 },
    { name: 'Sun', revenue: 28000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₨{analytics.revenue.value.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {analytics.revenue.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                analytics.revenue.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.revenue.growth}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.orders.value}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {analytics.orders.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                analytics.orders.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.orders.growth}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Customers</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.customers.value}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {analytics.customers.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                analytics.customers.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.customers.growth}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">₨{Math.round(analytics.aov.value).toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {analytics.aov.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                analytics.aov.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.aov.growth}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue chart would be displayed here</p>
                <p className="text-sm text-gray-400">Integration with Recharts needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Order Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusDistribution.map((item: any) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'delivered' ? 'bg-green-500' :
                      item.status === 'pending' ? 'bg-yellow-500' :
                      item.status === 'processing' ? 'bg-blue-500' :
                      item.status === 'shipped' ? 'bg-purple-500' :
                      'bg-red-500'
                    }`} />
                    <span className="capitalize">{item.status}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{item.count}</span>
                    <span className="text-sm text-gray-500 ml-2">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Top Products by Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((item: any, index: number) => (
              <div key={item.product._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <img
                    src={item.product.images?.[0]?.url || '/placeholder.jpg'}
                    alt={item.product.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">₨{item.product.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₨{item.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Products:</span>
                <span className="font-medium">{products?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Low Stock:</span>
                <span className="font-medium text-yellow-600">
                  {products?.filter((p: any) => p.inventory?.quantity < 10).length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Out of Stock:</span>
                <span className="font-medium text-red-600">
                  {products?.filter((p: any) => p.inventory?.quantity === 0).length || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Customers:</span>
                <span className="font-medium">{customers?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Customers:</span>
                <span className="font-medium text-green-600">
                  {customers?.filter((c: any) => c.isActive).length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Verified Customers:</span>
                <span className="font-medium text-blue-600">
                  {customers?.filter((c: any) => c.isVerified).length || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Orders:</span>
                <span className="font-medium">{orders?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed Orders:</span>
                <span className="font-medium text-green-600">
                  {orders?.filter((o: any) => o.status === 'delivered').length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pending Orders:</span>
                <span className="font-medium text-yellow-600">
                  {orders?.filter((o: any) => o.status === 'pending').length || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;