
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-sm backdrop-blur-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-bold">Bloom</Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          <li><Link to="/" className="hover:text-brand-green transition-colors">Home</Link></li>
          <li><Link to="/shop" className="hover:text-brand-green transition-colors">Shop</Link></li>
          <li><Link to="/about" className="hover:text-brand-green transition-colors">About</Link></li>
          <li><Link to="/contact" className="hover:text-brand-green transition-colors">Contact</Link></li>
        </ul>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <User size={20} className="text-foreground hover:text-brand-green transition-colors" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart size={20} className="text-foreground hover:text-brand-green transition-colors" />
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 animate-fade-in-slow">
          <div className="container-custom">
            <ul className="flex flex-col space-y-4 mb-4">
              <li><Link to="/" className="block hover:text-brand-green transition-colors" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link to="/shop" className="block hover:text-brand-green transition-colors" onClick={() => setIsOpen(false)}>Shop</Link></li>
              <li><Link to="/about" className="block hover:text-brand-green transition-colors" onClick={() => setIsOpen(false)}>About</Link></li>
              <li><Link to="/contact" className="block hover:text-brand-green transition-colors" onClick={() => setIsOpen(false)}>Contact</Link></li>
            </ul>
            <div className="flex space-x-4 pt-4 border-t">
              <Button variant="ghost" size="sm" className="flex items-center">
                <User size={18} className="mr-2" />
                Account
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center">
                <ShoppingCart size={18} className="mr-2" />
                Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
