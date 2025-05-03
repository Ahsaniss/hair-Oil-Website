
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-brand-cream">
        <div className="container-custom py-20 text-center">
          <h1 className="text-8xl md:text-9xl font-serif font-bold text-brand-green mb-6">404</h1>
          <p className="text-2xl md:text-3xl font-medium mb-6">Oops! Page not found</p>
          <p className="text-lg text-foreground/70 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <a 
            href="/" 
            className="btn-primary inline-flex items-center"
          >
            Return to Home
            <ArrowRight size={18} className="ml-2" />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
