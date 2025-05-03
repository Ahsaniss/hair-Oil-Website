
import { Leaf, Check, Info } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-brand-green" />,
      title: "100% Organic",
      description: "Made with hand-picked natural ingredients sourced from sustainable farms."
    },
    {
      icon: <Check className="h-8 w-8 text-brand-green" />,
      title: "No Chemicals",
      description: "Free from parabens, sulfates, silicones, and other harmful chemicals."
    },
    {
      icon: <Info className="h-8 w-8 text-brand-green" />,
      title: "Ayurvedic Formula",
      description: "Based on ancient Ayurvedic recipes passed down through generations."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why Choose Our Hair Oil?</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We combine traditional wisdom with modern science to create the perfect hair care solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-brand-cream p-8 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
