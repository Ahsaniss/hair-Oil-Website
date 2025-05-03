
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission - in a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-brand-green-light py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-green-dark mb-4">Contact Us</h1>
            <p className="text-lg text-foreground/80 max-w-xl">
              We'd love to hear from you. Reach out with any questions or feedback.
            </p>
          </div>
        </div>
        
        {/* Contact content */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-serif font-medium mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-brand-green-light p-3 rounded-full mr-4">
                      <Mail size={20} className="text-brand-green" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a href="mailto:info@bloomhair.com" className="text-muted-foreground hover:text-brand-green transition-colors">
                        info@bloomhair.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-green-light p-3 rounded-full mr-4">
                      <Phone size={20} className="text-brand-green" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-brand-green transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-green-light p-3 rounded-full mr-4">
                      <MapPin size={20} className="text-brand-green" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <address className="text-muted-foreground not-italic">
                        1234 Botanical Lane<br />
                        Herbal Heights, CA 90210
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-green-light p-3 rounded-full mr-4">
                      <MessageSquare size={20} className="text-brand-green" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Social Media</h3>
                      <div className="flex space-x-4 mt-2">
                        <a href="https://facebook.com" className="text-muted-foreground hover:text-brand-green transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </a>
                        <a href="https://instagram.com" className="text-muted-foreground hover:text-brand-green transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                        <a href="https://pinterest.com" className="text-muted-foreground hover:text-brand-green transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <path d="M19 12H5"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-serif font-medium mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what you'd like to know..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-brand-green hover:bg-brand-green-dark text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12 bg-brand-cream">
          <div className="container-custom">
            <h2 className="text-2xl font-serif font-medium mb-6 text-center">Visit Our Store</h2>
            <div className="rounded-lg overflow-hidden shadow-md h-96 bg-gray-200">
              {/* This would be a Google Map in a real implementation */}
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-muted-foreground">Google Maps would be displayed here</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
