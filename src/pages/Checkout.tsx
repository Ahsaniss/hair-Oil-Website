
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

// Helper function for error handling
const handleError = (error: any) => {
  const message = error.response?.data?.message || error.message || 'Something went wrong';
  toast.error(message);
  throw error;
};

// Products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const response = await api.get('/products');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        const response = await api.get(`/products/${id}`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await api.post('/products', data);
        toast.success('Product created successfully!');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      try {
        const response = await api.put(`/products/${id}`, data);
        toast.success('Product updated successfully!');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await api.delete(`/products/${id}`);
        toast.success('Product deleted successfully!');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
};

// Categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const response = await api.get('/categories');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await api.post('/categories', data);
        toast.success('Category created successfully!');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  });
};

// Orders
export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        const response = await api.get('/orders');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    }
  });
};

export const useMyOrders = () => {
  return useQuery({
    queryKey: ['my-orders'],
    queryFn: async () => {
      try {
        const response = await api.get('/orders/my-orders');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    }
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    enabled: !!id
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await api.post('/orders', data);
        toast.success('Order placed successfully!');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
    }
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      try {
        const response = await api.patch(`/orders/${id}/status`, { status });
        toast.success('Order status updated successfully!');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });
};

// Customers
export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      try {
        const response = await api.get('/customers');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    }
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      try {
        const response = await api.get(`/customers/${id}`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    enabled: !!id
  });
};

export const useUpdateCustomerStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      try {
        const response = await api.patch(`/customers/${id}/status`, { isActive });
        toast.success('Customer status updated successfully!');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });
};

// Analytics
export const useAnalytics = (dateRange?: string) => {
  return useQuery({
    queryKey: ['analytics', dateRange],
    queryFn: async () => {
      try {
        const response = await api.get(`/analytics?range=${dateRange || '7'}`);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    }
  });
};

// Auth
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    }
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: any) => {
      try {
        const response = await api.post('/auth/register', userData);
        return response.data;
      } catch (error) {
        handleError(error);
      }
    }
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const response = await api.get('/auth/profile');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    }
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await api.put('/auth/profile', data);
        toast.success('Profile updated successfully!');
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  ShieldCheck,
  CheckCircle,
  Package,
  MapPin,
  Phone,
  Mail,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

// Define checkout steps
type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';

const Checkout: React.FC = () => {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'cod', // cash on delivery
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
  });
  
  // Calculate order summary
  const subtotal = totalAmount;
  const shipping = subtotal > 1500 ? 0 : 150; // Free shipping over Rs 1500
  const tax = 0; // No tax for now
  const total = subtotal + shipping + tax;
  
  // Validation functions
  const validateShipping = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    return required.every(field => shippingInfo[field as keyof typeof shippingInfo].trim() !== '');
  };
  
  const validatePayment = () => {
    if (paymentInfo.paymentMethod === 'cod') return true;
    
    const required = ['cardName', 'cardNumber', 'expMonth', 'expYear', 'cvv'];
    return required.every(field => paymentInfo[field as keyof typeof paymentInfo].trim() !== '');
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateShipping()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setStep('payment');
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePayment()) {
      toast.error('Please fill in all payment details');
      return;
    }
    
    setStep('review');
    window.scrollTo(0, 0);
  };
  
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call to process order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newOrderNumber = `EH-${Date.now().toString().slice(-6)}`;
      setOrderNumber(newOrderNumber);
      
      // Clear cart after successful order
      clearCart();
      
      setStep('confirmation');
      window.scrollTo(0, 0);
      
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const updateShippingInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const updatePaymentInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  // Redirect if cart is empty
  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Confirmation Step */}
        {step === 'confirmation' ? (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 text-green-600 rounded-full p-4 inline-flex mb-6">
                  <CheckCircle className="h-8 w-8" />
                </div>
                
                <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
                <p className="text-gray-600 mb-6">
                  Thank you for your order. We'll send you a confirmation email shortly.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="font-medium text-gray-700">Order Number:</p>
                      <p className="text-lg font-bold">{orderNumber}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Order Date:</p>
                      <p>{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Total Amount:</p>
                      <p className="text-lg font-bold text-green-600">₨{total.toFixed(0)}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Delivery:</p>
                      <p>3-5 business days</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/shop">
                    <Button size="lg">Continue Shopping</Button>
                  </Link>
                  <Link to="/orders">
                    <Button variant="outline" size="lg">View Orders</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Checkout Content */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === 'shipping' ? 'bg-green-600 text-white' : 
                      ['payment', 'review'].includes(step) ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                    }`}>
                      1
                    </div>
                    <span className="text-sm mt-1">Shipping</span>
                  </div>
                  
                  <div className="flex-1 h-1 mx-4 bg-gray-200">
                    <div className={`h-full bg-green-600 transition-all ${
                      ['payment', 'review'].includes(step) ? 'w-full' : 'w-0'
                    }`}></div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === 'payment' ? 'bg-green-600 text-white' : 
                      step === 'review' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                    }`}>
                      2
                    </div>
                    <span className="text-sm mt-1">Payment</span>
                  </div>
                  
                  <div className="flex-1 h-1 mx-4 bg-gray-200">
                    <div className={`h-full bg-green-600 transition-all ${
                      step === 'review' ? 'w-full' : 'w-0'
                    }`}></div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === 'review' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      3
                    </div>
                    <span className="text-sm mt-1">Review</span>
                  </div>
                </div>
              </div>

              {/* Shipping Step */}
              {step === 'shipping' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleShippingSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={shippingInfo.firstName}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={shippingInfo.lastName}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={shippingInfo.phone}
                            onChange={updateShippingInfo}
                            placeholder="+92 300 1234567"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={shippingInfo.address}
                          onChange={updateShippingInfo}
                          placeholder="Street address, apartment, suite, etc."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={shippingInfo.city}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State/Province *</Label>
                          <Input
                            id="state"
                            name="state"
                            value={shippingInfo.state}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">Postal Code *</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <select
                          id="country"
                          name="country"
                          value={shippingInfo.country}
                          onChange={updateShippingInfo}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="Pakistan">Pakistan</option>
                          <option value="India">India</option>
                          <option value="Bangladesh">Bangladesh</option>
                        </select>
                      </div>

                      <div className="flex justify-between">
                        <Link to="/cart">
                          <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Cart
                          </Button>
                        </Link>
                        <Button type="submit">
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Payment Step */}
              {step === 'payment' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="cod"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentInfo.paymentMethod === 'cod'}
                            onChange={updatePaymentInfo}
                            className="text-green-600"
                          />
                          <Label htmlFor="cod" className="flex items-center cursor-pointer">
                            <Package className="h-4 w-4 mr-2" />
                            Cash on Delivery
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="card"
                            name="paymentMethod"
                            value="card"
                            checked={paymentInfo.paymentMethod === 'card'}
                            onChange={updatePaymentInfo}
                            className="text-green-600"
                          />
                          <Label htmlFor="card" className="flex items-center cursor-pointer">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Credit/Debit Card
                          </Label>
                        </div>
                      </div>

                      {paymentInfo.paymentMethod === 'card' && (
                        <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                          <div>
                            <Label htmlFor="cardName">Name on Card *</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              value={paymentInfo.cardName}
                              onChange={updatePaymentInfo}
                              required={paymentInfo.paymentMethod === 'card'}
                            />
                          </div>

                          <div>
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={paymentInfo.cardNumber}
                              onChange={updatePaymentInfo}
                              required={paymentInfo.paymentMethod === 'card'}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="expMonth">Month *</Label>
                              <Input
                                id="expMonth"
                                name="expMonth"
                                placeholder="MM"
                                maxLength={2}
                                value={paymentInfo.expMonth}
                                onChange={updatePaymentInfo}
                                required={paymentInfo.paymentMethod === 'card'}
                              />
                            </div>
                            <div>
                              <Label htmlFor="expYear">Year *</Label>
                              <Input
                                id="expYear"
                                name="expYear"
                                placeholder="YYYY"
                                maxLength={4}
                                value={paymentInfo.expYear}
                                onChange={updatePaymentInfo}
                                required={paymentInfo.paymentMethod === 'card'}
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                placeholder="123"
                                maxLength={4}
                                value={paymentInfo.cvv}
                                onChange={updatePaymentInfo}
                                required={paymentInfo.paymentMethod === 'card'}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setStep('shipping')}>
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back to Shipping
                        </Button>
                        <Button type="submit">
                          Review Order
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Review Step */}
              {step === 'review' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Order Items */}
                      <div>
                        <h3 className="font-medium mb-4">Order Items</h3>
                        <div className="space-y-4">
                          {items.map(item => (
                            <div key={item._id} className="flex justify-between items-center py-2 border-b">
                              <div className="flex items-center space-x-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium">₨{(item.price * item.quantity).toFixed(0)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Info */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Shipping Information</h3>
                          <Button 
                            variant="link" 
                            onClick={() => setStep('shipping')}
                            className="p-0 h-auto text-sm"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                          <p>{shippingInfo.address}</p>
                          <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                          <p>{shippingInfo.country}</p>
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {shippingInfo.email}
                            </span>
                            <span className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {shippingInfo.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Payment Method</h3>
                          <Button 
                            variant="link" 
                            onClick={() => setStep('payment')}
                            className="p-0 h-auto text-sm"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center">
                            {paymentInfo.paymentMethod === 'cod' ? (
                              <>
                                <Package className="h-4 w-4 mr-2" />
                                <span>Cash on Delivery</span>
                              </>
                            ) : (
                              <>
                                <CreditCard className="h-4 w-4 mr-2" />
                                <span>Credit Card ending in {paymentInfo.cardNumber.slice(-4)}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleOrderSubmit}>
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setStep('payment')}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Payment
                          </Button>
                          <Button type="submit" disabled={loading}>
                            {loading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              'Place Order'
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {items.map(item => (
                        <div key={item._id} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₨{(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₨{subtotal.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `₨${shipping}`}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>₨{total.toFixed(0)}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        <span>Free shipping over ₨1500</span>
                      </div>
                      <div className="flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        <span>Secure checkout</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

