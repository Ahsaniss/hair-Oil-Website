
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Define a type for the checkout steps to ensure type safety
type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';

// Mock cart data - in a real app, this would come from context/state management
const cartItems = [
  {
    id: 1,
    name: "Root Revival Hair Oil",
    price: 34.99,
    quantity: 1
  },
  {
    id: 2,
    name: "Scalp Soother Oil",
    price: 29.99,
    quantity: 2
  }
];

const Checkout = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    sameAsShipping: true,
  });
  
  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
    window.scrollTo(0, 0);
  };
  
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to process order
    setTimeout(() => {
      setLoading(false);
      setStep('confirmation');
      window.scrollTo(0, 0);
      
      toast({
        title: "Order placed successfully!",
        description: "Your order has been received and is being processed.",
      });
    }, 2000);
  };
  
  const updateShippingInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const updatePaymentInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-brand-cream">
        <div className="container-custom py-12">
          {/* Confirmation Step */}
          {step === 'confirmation' ? (
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-8">
                <div className="bg-green-100 text-green-600 rounded-full p-4 inline-flex mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h1 className="text-2xl font-serif font-bold mb-2">Thank You For Your Order!</h1>
                <p className="text-muted-foreground">
                  Your order has been received and is being processed.
                </p>
              </div>
              
              <div className="border rounded-md p-6 mb-8">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Order Number:</span>
                  <span>BLM-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Order Date:</span>
                  <span>{new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Shipping Method:</span>
                  <span>Standard Shipping (3-5 business days)</span>
                </div>
              </div>
              
              <p className="text-center text-sm text-muted-foreground mb-8">
                A confirmation email has been sent to <strong>{shippingInfo.email}</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  className="bg-brand-green hover:bg-brand-green-dark"
                  asChild
                >
                  <Link to="/shop">
                    Continue Shopping
                  </Link>
                </Button>
                
                <Button 
                  variant="outline"
                  asChild
                >
                  <Link to="/account">
                    View My Orders
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Steps */}
              <div className="lg:col-span-2">
                {/* Steps Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step === 'shipping' ? 'bg-brand-green text-white' : 'bg-brand-green-light text-brand-green'}`}>
                        1
                      </div>
                      <span className="text-sm mt-1">Shipping</span>
                    </div>
                    
                    <div className="h-1 flex-grow mx-2 bg-brand-green-light"></div>
                    
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-brand-green text-white' : step === 'review' || step === 'confirmation' ? 'bg-brand-green-light text-brand-green' : 'bg-brand-cream text-muted-foreground'}`}>
                        2
                      </div>
                      <span className="text-sm mt-1">Payment</span>
                    </div>
                    
                    <div className="h-1 flex-grow mx-2 bg-brand-green-light"></div>
                    
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step === 'review' ? 'bg-brand-green text-white' : step === 'confirmation' ? 'bg-brand-green-light text-brand-green' : 'bg-brand-cream text-muted-foreground'}`}>
                        3
                      </div>
                      <span className="text-sm mt-1">Review</span>
                    </div>
                  </div>
                </div>
                
                {/* Shipping Step */}
                {step === 'shipping' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
                    
                    <form onSubmit={handleShippingSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName"
                            name="firstName"
                            value={shippingInfo.firstName}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName"
                            name="lastName"
                            value={shippingInfo.lastName}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            type="tel"
                            value={shippingInfo.phone}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address"
                          name="address"
                          value={shippingInfo.address}
                          onChange={updateShippingInfo}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city"
                            name="city"
                            value={shippingInfo.city}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input 
                            id="state"
                            name="state"
                            value={shippingInfo.state}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input 
                            id="zipCode"
                            name="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={updateShippingInfo}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-8">
                        <Label htmlFor="country">Country</Label>
                        <Select 
                          value={shippingInfo.country} 
                          onValueChange={(value) => setShippingInfo({...shippingInfo, country: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          variant="outline"
                          asChild
                        >
                          <Link to="/cart">
                            <ArrowLeft size={18} className="mr-2" />
                            Return to Cart
                          </Link>
                        </Button>
                        
                        <Button 
                          type="submit"
                          className="bg-brand-green hover:bg-brand-green-dark"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Payment Step */}
                {step === 'payment' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-medium mb-6">Payment Method</h2>
                    
                    <form onSubmit={handlePaymentSubmit}>
                      {/* Payment Options */}
                      <div className="mb-6">
                        <RadioGroup defaultValue="card">
                          <div className="flex items-center space-x-2 border rounded-md p-4">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center">
                              <CreditCard size={18} className="mr-2 text-muted-foreground" />
                              Credit or Debit Card
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {/* Card Details */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input 
                            id="cardName"
                            name="cardName"
                            value={paymentInfo.cardName}
                            onChange={updatePaymentInfo}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="XXXX XXXX XXXX XXXX"
                            value={paymentInfo.cardNumber}
                            onChange={updatePaymentInfo}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expMonth">Month</Label>
                            <Input 
                              id="expMonth"
                              name="expMonth"
                              placeholder="MM"
                              value={paymentInfo.expMonth}
                              onChange={updatePaymentInfo}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="expYear">Year</Label>
                            <Input 
                              id="expYear"
                              name="expYear"
                              placeholder="YYYY"
                              value={paymentInfo.expYear}
                              onChange={updatePaymentInfo}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv"
                              name="cvv"
                              placeholder="XXX"
                              value={paymentInfo.cvv}
                              onChange={updatePaymentInfo}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="sameAsShipping"
                            checked={paymentInfo.sameAsShipping}
                            onCheckedChange={(checked) => 
                              setPaymentInfo({...paymentInfo, sameAsShipping: checked as boolean})
                            }
                          />
                          <Label htmlFor="sameAsShipping">Billing address is the same as shipping address</Label>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-8">
                        <Button 
                          variant="outline"
                          onClick={() => setStep('shipping')}
                        >
                          <ArrowLeft size={18} className="mr-2" />
                          Back to Shipping
                        </Button>
                        
                        <Button 
                          type="submit"
                          className="bg-brand-green hover:bg-brand-green-dark"
                        >
                          Review Order
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Review Step */}
                {step === 'review' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-medium mb-6">Review Your Order</h2>
                    
                    {/* Order Items */}
                    <div className="mb-8">
                      <h3 className="font-medium mb-4">Order Items</h3>
                      
                      <div className="space-y-4">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex justify-between">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Shipping Info */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Shipping Information</h3>
                        <Button 
                          variant="link"
                          className="p-0 h-auto text-sm"
                          onClick={() => setStep('shipping')}
                        >
                          Edit
                        </Button>
                      </div>
                      
                      <div className="bg-brand-cream rounded-md p-4 text-sm">
                        <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p className="mt-2">{shippingInfo.email}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                    </div>
                    
                    {/* Payment Info */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Payment Method</h3>
                        <Button 
                          variant="link"
                          className="p-0 h-auto text-sm"
                          onClick={() => setStep('payment')}
                        >
                          Edit
                        </Button>
                      </div>
                      
                      <div className="bg-brand-cream rounded-md p-4 text-sm">
                        <div className="flex items-center">
                          <CreditCard size={18} className="mr-2 text-muted-foreground" />
                          <span>Credit Card •••• {paymentInfo.cardNumber.slice(-4)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <form onSubmit={handleReviewSubmit}>
                      <div className="flex justify-between">
                        <Button 
                          variant="outline"
                          onClick={() => setStep('payment')}
                        >
                          <ArrowLeft size={18} className="mr-2" />
                          Back to Payment
                        </Button>
                        
                        <Button 
                          type="submit"
                          className="bg-brand-green hover:bg-brand-green-dark"
                          disabled={loading}
                        >
                          {loading ? 'Processing...' : 'Place Order'}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p>{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Truck size={16} className="mr-2" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                    
                    <div className="flex items-center">
                      <ShieldCheck size={16} className="mr-2" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;

