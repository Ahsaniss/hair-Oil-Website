import React, { useState } from 'react';
import { useCustomers, useUpdateCustomerStatus } from '../../hooks/useAPI';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Eye, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  UserCheck,
  UserX,
  MoreHorizontal,
  Download,
  Plus,
  Edit,
  Ban,
  MessageCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';

const AdminCustomers: React.FC = () => {
  const { data: customers, isLoading } = useCustomers();
  const updateCustomerStatusMutation = useUpdateCustomerStatus();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isCustomerDetailOpen, setIsCustomerDetailOpen] = useState(false);

  // Filter customers
  const filteredCustomers = customers?.filter((customer: any) => {
    const matchesSearch = 
      customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && customer.isActive) ||
      (statusFilter === 'inactive' && !customer.isActive) ||
      (statusFilter === 'verified' && customer.isVerified) ||
      (statusFilter === 'unverified' && !customer.isVerified);
    
    return matchesSearch && matchesStatus;
  }) || [];

  const toggleCustomerStatus = async (customerId: string, currentStatus: boolean) => {
    try {
      await updateCustomerStatusMutation.mutateAsync({
        id: customerId,
        isActive: !currentStatus
      });
      toast.success(`Customer ${currentStatus ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error('Failed to update customer status');
    }
  };

  const getCustomerStats = () => {
    if (!customers) return { total: 0, active: 0, verified: 0, newThisMonth: 0, totalRevenue: 0 };
    
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return {
      total: customers.length,
      active: customers.filter((c: any) => c.isActive).length,
      verified: customers.filter((c: any) => c.isVerified).length,
      newThisMonth: customers.filter((c: any) => new Date(c.createdAt) >= thisMonth).length,
      totalRevenue: customers.reduce((sum: number, customer: any) => sum + (customer.totalSpent || 0), 0)
    };
  };

  const stats = getCustomerStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer base and relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Customers</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.verified}</p>
                <p className="text-sm text-gray-600">Verified</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.newThisMonth}</p>
                <p className="text-sm text-gray-600">New This Month</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">₨{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading customers...</div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No customers found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Contact</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Orders</th>
                    <th className="text-left p-3">Total Spent</th>
                    <th className="text-left p-3">Joined</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer: any) => (
                    <tr key={customer._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {customer.firstName?.charAt(0)}{customer.lastName?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">
                              {customer.firstName} {customer.lastName}
                            </p>
                            <p className="text-sm text-gray-600">ID: {customer._id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <p className="text-sm flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {customer.phone || 'N/A'}
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <Badge variant={customer.isActive ? "default" : "secondary"}>
                            {customer.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <br />
                          <Badge variant={customer.isVerified ? "default" : "outline"}>
                            {customer.isVerified ? 'Verified' : 'Unverified'}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{customer.totalOrders || 0}</p>
                          <p className="text-sm text-gray-600">orders</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <p className="font-medium">₨{(customer.totalSpent || 0).toLocaleString()}</p>
                          <p className="text-sm text-gray-600">
                            ₨{Math.round((customer.totalSpent || 0) / Math.max(customer.totalOrders || 1, 1))} avg
                          </p>
                        </div>
                      </td>
                      <td className="p-3">
                        <p className="text-sm">
                          {new Date(customer.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-600">
                          {customer.lastLogin ? new Date(customer.lastLogin).toLocaleDateString() : 'Never'}
                        </p>
                      </td>
                      <td className="p-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedCustomer(customer);
                                setIsCustomerDetailOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Send SMS
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toggleCustomerStatus(customer._id, customer.isActive)}
                              className={customer.isActive ? "text-red-600" : "text-green-600"}
                            >
                              {customer.isActive ? (
                                <>
                                  <Ban className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Detail Dialog */}
      <Dialog open={isCustomerDetailOpen} onOpenChange={setIsCustomerDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCustomer && (
            <CustomerDetailView customer={selectedCustomer} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Customer Detail Component
const CustomerDetailView: React.FC<{ customer: any }> = ({ customer }) => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
              {customer.firstName?.charAt(0)}{customer.lastName?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {customer.firstName} {customer.lastName}
              </h2>
              <p className="text-sm text-gray-600">{customer.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={customer.isActive ? "default" : "secondary"}>
              {customer.isActive ? 'Active' : 'Inactive'}
            </Badge>
            <Badge variant={customer.isVerified ? "default" : "outline"}>
              {customer.isVerified ? 'Verified' : 'Unverified'}
            </Badge>
          </div>
        </DialogTitle>
      </DialogHeader>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { id: 'profile', label: 'Profile', icon: UserCheck },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'addresses', label: 'Addresses', icon: MapPin },
            { id: 'activity', label: 'Activity', icon: Calendar }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-gray-900">{customer.firstName} {customer.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{customer.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-900">{customer.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Member Since</label>
                  <p className="text-gray-900">{new Date(customer.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Login</label>
                  <p className="text-gray-900">
                    {customer.lastLogin ? new Date(customer.lastLogin).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Purchase Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Orders:</span>
                  <span className="font-medium">{customer.totalOrders || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Spent:</span>
                  <span className="font-medium">₨{(customer.totalSpent || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Order:</span>
                  <span className="font-medium">
                    ₨{Math.round((customer.totalSpent || 0) / Math.max(customer.totalOrders || 1, 1)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant={customer.isActive ? "default" : "secondary"}>
                    {customer.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'orders' && (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                No order history available
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'addresses' && (
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                No addresses saved
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'activity' && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Account Created</p>
                    <p className="text-sm text-gray-600">
                      {new Date(customer.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {customer.lastLogin && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <UserCheck className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Last Login</p>
                      <p className="text-sm text-gray-600">
                        {new Date(customer.lastLogin).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t">
        <Button>
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </Button>
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
        <Button variant="outline">
          <MessageCircle className="h-4 w-4 mr-2" />
          Send SMS
        </Button>
      </div>
    </div>
  );
};

export default AdminCustomers;