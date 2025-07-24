import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Layout Components
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminDashboard from './components/admin/AdminDashboard';
import AdminOrders from './components/admin/AdminOrders';
import AdminCustomers from './components/admin/AdminCustomers';
import AdminAnalytics from './components/admin/AdminAnalytics';
import AdminProducts from './components/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';

// User Account Pages
import Account from './pages/Account';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route Component for Admin
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Protected Route Component for User
const UserProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Main App Component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  
                  {/* Auth Routes (Public) */}
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  
                  {/* Protected User Routes */}
                  <Route 
                    path="checkout" 
                    element={
                      <UserProtectedRoute>
                        <Checkout />
                      </UserProtectedRoute>
                    } 
                  />
                  <Route 
                    path="account" 
                    element={
                      <UserProtectedRoute>
                        <Account />
                      </UserProtectedRoute>
                    } 
                  />
                  <Route 
                    path="orders" 
                    element={
                      <UserProtectedRoute>
                        <Orders />
                      </UserProtectedRoute>
                    } 
                  />
                  <Route 
                    path="profile" 
                    element={
                      <UserProtectedRoute>
                        <Profile />
                      </UserProtectedRoute>
                    } 
                  />
                </Route>

                {/* Admin Routes with AdminLayout */}
                <Route 
                  path="/admin" 
                  element={
                    <AdminProtectedRoute>
                      <AdminLayout />
                    </AdminProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/new" element={<AdminProductForm />} />
                  <Route path="products/edit/:id" element={<AdminProductForm />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route 
                    path="settings" 
                    element={
                      <div className="p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>
                        <p className="text-gray-600">Settings panel coming soon...</p>
                      </div>
                    } 
                  />
                </Route>

                {/* 404 Page */}
                <Route 
                  path="*" 
                  element={
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                      <div className="text-center max-w-md mx-auto p-8">
                        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
                        <p className="text-gray-600 mb-6">
                          The page you're looking for doesn't exist or has been moved.
                        </p>
                        <div className="space-y-2">
                          <a 
                            href="/" 
                            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Go Home
                          </a>
                          <br />
                          <a 
                            href="/shop" 
                            className="inline-block text-green-600 hover:underline"
                          >
                            Browse Products
                          </a>
                        </div>
                      </div>
                    </div>
                  } 
                />
              </Routes>
              
              {/* Global Toast Notifications */}
              <Toaster 
                position="top-right" 
                richColors 
                closeButton
                duration={4000}
              />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;