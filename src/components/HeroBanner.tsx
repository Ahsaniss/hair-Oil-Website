
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative pt-20 lg:min-h-[85vh] flex items-center overflow-hidden bg-brand-cream">
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 bottom-0 w-3/4 md:w-2/3 lg:w-1/2 h-full">
          <svg className="absolute bottom-0 right-0 text-brand-green/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <path fill="currentColor" d="M42,-72.5C54.9,-66.3,65.8,-55.9,71.5,-43.2C77.2,-30.4,77.7,-15.2,77.4,-0.1C77.2,14.9,76.1,29.7,69.5,41.6C62.9,53.5,50.6,62.4,37.4,66.8C24.2,71.3,10.1,71.3,-3.7,69.7C-17.5,68.1,-35,65,-46.6,55.8C-58.3,46.7,-64.1,31.6,-69.7,15.7C-75.3,-0.3,-80.6,-17,-77.1,-31.9C-73.7,-46.7,-61.4,-59.6,-47.2,-65.9C-33,-72.1,-16.5,-71.7,-0.5,-70.7C15.5,-69.7,31,-78.7,42,-72.5Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      <div className="container-custom relative z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">Nourish Your Hair With Nature's Touch</h1>
            <p className="text-lg md:text-xl mb-8 text-foreground/80 max-w-lg">
              Our premium Ayurvedic hair oil blends ancient wisdom with modern science to transform your hair care routine.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary flex items-center">
                Shop Now
                <ArrowRight size={18} className="ml-2" />
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end animate-fade-in-slow">
            <div className="relative w-64 md:w-80 lg:w-96 aspect-[3/4]">
              <div className="absolute inset-0 bg-brand-green/10 rounded-full -top-6 -right-6"></div>
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="Premium Hair Oil" 
                className="relative z-10 object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-brand-brown/10 w-32 h-32 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
