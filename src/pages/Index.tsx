
import HeroBanner from "@/components/HeroBanner";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FeaturedProducts from "@/components/FeaturedProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        
        {/* Admin Access Section */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container-custom">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center text-2xl text-blue-700">
                  <Settings className="mr-2 h-6 w-6" />
                  Admin Control Panel
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Access administrative features to manage your store
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {!isAuthenticated && (
                    <>
                      <div className="text-center">
                        <Link to="/login">
                          <Button className="w-full" size="lg">
                            <LogIn className="mr-2 h-5 w-5" />
                            Login
                          </Button>
                        </Link>
                        <p className="text-sm text-gray-600 mt-2">
                          Sign in to your account
                        </p>
                      </div>
                      <div className="text-center">
                        <Link to="/register">
                          <Button variant="outline" className="w-full" size="lg">
                            <UserPlus className="mr-2 h-5 w-5" />
                            Register
                          </Button>
                        </Link>
                        <p className="text-sm text-gray-600 mt-2">
                          Create a new account
                        </p>
                      </div>
                    </>
                  )}
                  
                  {isAuthenticated && (
                    <div className="text-center">
                      <Link to="/admin-setup">
                        <Button variant="outline" className="w-full text-blue-600 border-blue-600" size="lg">
                          <Settings className="mr-2 h-5 w-5" />
                          Admin Setup
                        </Button>
                      </Link>
                      <p className="text-sm text-gray-600 mt-2">
                        Grant admin privileges
                      </p>
                    </div>
                  )}
                  
                  {isAdmin && (
                    <div className="text-center">
                      <Link to="/admin">
                        <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                          <Settings className="mr-2 h-5 w-5" />
                          Admin Panel
                        </Button>
                      </Link>
                      <p className="text-sm text-gray-600 mt-2">
                        Manage products & orders
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <Features />
        <FeaturedProducts />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
