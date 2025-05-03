
import { useState } from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Hair Stylist",
      quote: "This oil has transformed my clients' hair. The natural ingredients provide deep nourishment without any greasy residue. My go-to recommendation for all hair types.",
      rating: 5
    },
    {
      name: "Michael Chen",
      position: "Customer",
      quote: "After trying countless products for my dry, damaged hair, this oil was a game-changer. My hair is noticeably softer, shinier, and more manageable after just a few weeks.",
      rating: 5
    },
    {
      name: "Priya Patel",
      position: "Wellness Blogger",
      quote: "I love that this oil uses traditional Ayurvedic ingredients. The scent is divine and my scalp health has improved dramatically. It's become an essential part of my self-care routine.",
      rating: 4
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-16 md:py-24 bg-brand-green-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Join thousands of happy customers who have transformed their hair care routine.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-lg shadow-md p-8 md:p-10">
            <div className="flex mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-brand-brown text-brand-brown" />
              ))}
              {[...Array(5 - testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i + testimonials[activeIndex].rating} className="h-5 w-5 text-brand-brown/30" />
              ))}
            </div>
            
            <p className="text-lg md:text-xl mb-8 italic">
              "{testimonials[activeIndex].quote}"
            </p>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-brand-brown-light rounded-full flex items-center justify-center text-brand-brown font-semibold">
                {testimonials[activeIndex].name.charAt(0)}
              </div>
              <div className="ml-4">
                <p className="font-semibold">{testimonials[activeIndex].name}</p>
                <p className="text-sm text-foreground/70">{testimonials[activeIndex].position}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-brand-green w-6' : 'bg-brand-green/30'}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          
          <div className="flex justify-between mt-8">
            <button 
              className="bg-white p-3 rounded-full shadow-md hover:bg-brand-cream transition-colors"
              onClick={prevTestimonial}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="bg-white p-3 rounded-full shadow-md hover:bg-brand-cream transition-colors"
              onClick={nextTestimonial}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
