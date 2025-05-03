
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Mock cart data - in a real app, this would come from a cart context or API
const initialCartItems = [
  {
    id: 1,
    name: "Root Revival Hair Oil",
    price: 34.99,
    image: "/placeholder.svg",
    quantity: 1
  },
  {
    id: 2,
    name: "Scalp Soother Oil",
    price: 29.99,
    image: "/placeholder.svg",
    quantity: 2
  }
];

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.10 : 0; // 10% discount when promo is applied
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal - discount + shipping;
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };
  
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'bloom10') {
      setPromoApplied(true);
      
      toast({
        title: "Promo code applied!",
        description: "10% discount has been applied to your order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-brand-cream">
        <div className="container-custom py-12">
          <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="space-y-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center">
                        <div className="h-24 w-24 bg-brand-cream rounded-md overflow-hidden shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-contain p-2" 
                          />
                        </div>
                        
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <X size={18} />
                            </button>
                          </div>
                          
                          <div className="mt-2 flex justify-between items-center">
                            <div className="flex items-center border rounded-md">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link to="/shop" className="text-brand-green hover:text-brand-green-dark flex items-center font-medium">
                    <ShoppingCart size={18} className="mr-2" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                      />
                      <Button 
                        variant="outline"
                        onClick={applyPromoCode}
                        disabled={promoApplied || !promoCode}
                      >
                        Apply
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-green-600 text-sm mt-2">Promo code applied!</p>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  {/* Price Summary */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over $50
                      </p>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-6 bg-brand-green hover:bg-brand-green-dark"
                    asChild
                  >
                    <Link to="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Secure checkout. All payment information is encrypted.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-brand-cream rounded-full p-4">
                  <ShoppingCart size={32} className="text-brand-green" />
                </div>
              </div>
              
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              
              <Button 
                className="bg-brand-green hover:bg-brand-green-dark"
                asChild
              >
                <Link to="/shop">
                  Browse Products
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
