
import HeroBanner from "@/components/HeroBanner";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FeaturedProducts from "@/components/FeaturedProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        <Features />
        <FeaturedProducts />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
