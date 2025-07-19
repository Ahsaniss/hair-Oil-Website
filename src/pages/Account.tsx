import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Package, Heart, LogOut, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  // Dummy state for demonstration - in a real app this would come from auth context/API
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Login form state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [isLoading, setIsLoading] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890'
  });

  // Mock order history
  const orderHistory = [
    {
      id: 'ORD-1234',
      date: '2023-04-15',
      status: 'Delivered',
      total: 64.98,
      items: [
        { id: 1, name: 'Root Revival Hair Oil', price: 34.99, quantity: 1 },
        { id: 2, name: 'Scalp Soother Oil', price: 29.99, quantity: 1 }
      ]
    },
    {
      id: 'ORD-5678',
      date: '2023-03-22',
      status: 'Delivered',
      total: 39.99,
      items: [
        { id: 3, name: 'Growth Elixir', price: 39.99, quantity: 1 }
      ]
    }
  ];

  // Mock wishlist
  const wishlist = [
    {
      id: 4,
      name: 'Shine Booster Serum',
      price: 32.99,
      image: '/placeholder.svg'
    },
    {
      id: 5,
      name: 'Overnight Repair Treatment',
      price: 42.99,
      image: '/placeholder.svg'
    }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate register API call
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
    }, 1500);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated.",
      });
    }, 1500);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setActiveTab("profile");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-brand-cream">
          <div className="container-custom py-16">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-serif font-bold text-center mb-8">Account</h1>
              
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Welcome Back</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <a href="#" className="text-sm text-brand-green hover:underline">
                              Forgot password?
                            </a>
                          </div>
                          <Input 
                            id="password" 
                            type="password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                            required
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-brand-green hover:bg-brand-green-dark"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="register">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Create an Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input 
                            id="register-email" 
                            type="email"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Password</Label>
                          <Input 
                            id="register-password" 
                            type="password"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input 
                            id="confirm-password" 
                            type="password"
                            value={registerForm.confirmPassword}
                            onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                            required
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-brand-green hover:bg-brand-green-dark"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Creating account...' : 'Register'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-brand-cream">
        <div className="container-custom py-16">
          <h1 className="text-3xl font-serif font-bold mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-3">
              <Card>
                <CardContent className="p-0">
                  <nav className="flex flex-col">
                    <button 
                      onClick={() => setActiveTab("profile")}
                      className={`flex items-center px-4 py-3 text-left hover:bg-brand-cream transition-colors ${activeTab === "profile" ? 'bg-brand-cream text-brand-green font-medium' : ''}`}
                    >
                      <User size={18} className="mr-2" />
                      <span>Profile</span>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab("orders")}
                      className={`flex items-center px-4 py-3 text-left hover:bg-brand-cream transition-colors ${activeTab === "orders" ? 'bg-brand-cream text-brand-green font-medium' : ''}`}
                    >
                      <Package size={18} className="mr-2" />
                      <span>Order History</span>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab("wishlist")}
                      className={`flex items-center px-4 py-3 text-left hover:bg-brand-cream transition-colors ${activeTab === "wishlist" ? 'bg-brand-cream text-brand-green font-medium' : ''}`}
                    >
                      <Heart size={18} className="mr-2" />
                      <span>Wishlist</span>
                    </button>
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center px-4 py-3 text-left text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} className="mr-2" />
                      <span>Logout</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Content */}
            <div className="md:col-span-9">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="profile-name">Full Name</Label>
                          <Input 
                            id="profile-name" 
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="profile-email">Email</Label>
                          <Input 
                            id="profile-email" 
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="profile-phone">Phone Number</Label>
                        <Input 
                          id="profile-phone" 
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="bg-brand-green hover:bg-brand-green-dark"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Update Profile'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
              
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {orderHistory.length > 0 ? (
                        <div className="space-y-6">
                          {orderHistory.map(order => (
                            <div key={order.id} className="border rounded-md p-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div>
                                  <p className="font-medium">{order.id}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(order.date).toLocaleDateString('en-US', { 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}
                                  </p>
                                </div>
                                <div className="mt-2 md:mt-0 flex items-center space-x-4">
                                  <span className={`text-sm px-2 py-1 rounded-full ${
                                    order.status === 'Delivered' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {order.status}
                                  </span>
                                  <span className="font-medium">${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                              
                              <div className="border-t pt-4">
                                <p className="font-medium mb-2">Items:</p>
                                <ul className="space-y-1 text-sm">
                                  {order.items.map(item => (
                                    <li key={item.id} className="flex justify-between">
                                      <span>{item.name} × {item.quantity}</span>
                                      <span>${item.price.toFixed(2)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                          <Button 
                            className="mt-4 bg-brand-green hover:bg-brand-green-dark"
                            onClick={() => window.location.href = '/shop'}
                          >
                            Browse Products
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {wishlist.map(item => (
                          <div key={item.id} className="flex items-center space-x-4 border rounded-md p-4">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded-md" 
                            />
                            <div className="flex-grow">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-brand-green">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button className="bg-brand-green hover:bg-brand-green-dark text-xs h-8 px-2">
                                Add to Cart
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs h-8 px-2">
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Your wishlist is empty.</p>
                        <Button 
                          className="mt-4 bg-brand-green hover:bg-brand-green-dark"
                          onClick={() => window.location.href = '/shop'}
                        >
                          Browse Products
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
