
import { Facebook, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-green-dark text-white">
      <div className="container-custom py-16">
        {/* Newsletter Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-serif mb-2">Subscribe to our newsletter</h3>
              <p className="text-white/80">Get exclusive offers, tips, and updates delivered to your inbox.</p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-md focus:outline-none text-foreground"
                  required
                />
                <button
                  type="submit"
                  className="bg-brand-brown hover:bg-brand-brown-dark text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - About */}
          <div>
            <h4 className="font-serif text-xl font-medium mb-4">Bloom</h4>
            <p className="text-white/80 mb-6">
              Crafting premium hair oils using ancient Ayurvedic practices combined with modern scientific techniques.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white/80 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-white/80 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@example.com" className="text-white/80 hover:text-white transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-white/80 hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-white/80 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 3 - Help */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Help</h4>
            <ul className="space-y-3">
              <li><Link to="/shipping" className="text-white/80 hover:text-white transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="text-white/80 hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Contact Us</h4>
            <address className="text-white/80 not-italic">
              <p className="mb-3">1234 Botanical Lane</p>
              <p className="mb-3">Herbal Heights, CA 90210</p>
              <p className="mb-3">
                <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
              </p>
              <p>
                <a href="mailto:info@bloomhair.com" className="hover:text-white transition-colors">info@bloomhair.com</a>
              </p>
            </address>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p>© {new Date().getFullYear()} Bloom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
