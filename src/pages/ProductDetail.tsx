
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock product data
const products = [
  {
    id: "1",
    name: "Root Revival Hair Oil",
    price: 34.99,
    rating: 4.8,
    reviews: 124,
    description: "A nourishing blend of ancient Ayurvedic herbs and oils designed to strengthen roots, reduce hair fall, and promote healthy growth. This powerful formulation deeply penetrates the scalp to rejuvenate follicles and restore vitality to your hair.",
    benefits: [
      "Strengthens hair roots and reduces breakage",
      "Stimulates blood circulation in the scalp",
      "Prevents premature greying",
      "Adds natural shine and luster"
    ],
    ingredients: "Coconut Oil, Amla Extract, Bhringraj, Brahmi, Neem Oil, Sesame Oil, Castor Oil, Essential Oils of Rosemary and Lavender",
    directions: "Apply 2-3 drops to fingertips and massage into scalp. Work through to hair ends if desired. For best results, leave overnight and wash in the morning. Use 2-3 times per week.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    related: [2, 3, 5]
  },
  {
    id: "2",
    name: "Scalp Soother Oil",
    price: 29.99,
    rating: 4.5,
    reviews: 98,
    description: "Specially formulated to calm irritated scalps and reduce flakiness. This cooling and soothing oil blend helps balance scalp pH while providing relief from itching and inflammation.",
    benefits: [
      "Relieves dry, itchy scalp",
      "Reduces dandruff and flakiness",
      "Soothes inflammation and redness",
      "Balances natural scalp oils"
    ],
    ingredients: "Neem Oil, Tea Tree Essential Oil, Peppermint Oil, Aloe Vera Extract, Jojoba Oil, Vitamin E, Witch Hazel Extract",
    directions: "Apply 2-3 drops directly to scalp and massage gently. Best used after washing hair, on slightly damp scalp. Use daily for severe conditions, or 2-3 times weekly for maintenance.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    related: [1, 4, 6]
  },
  {
    id: "3",
    name: "Growth Elixir",
    price: 39.99,
    rating: 4.9,
    reviews: 156,
    description: "Our most potent formula for encouraging new hair growth and increasing hair density. Ancient herbs known for their growth-stimulating properties are combined with modern hair science to deliver visible results.",
    benefits: [
      "Promotes new hair growth",
      "Increases hair density and thickness",
      "Prevents hair thinning",
      "Strengthens existing hair strands"
    ],
    ingredients: "Bhringraj Extract, Brahmi, Amla, Hibiscus Extract, Onion Seed Oil, Castor Oil, Rosemary Essential Oil, Peppermint Essential Oil, Biotin",
    directions: "Apply 5-6 drops to areas of thinning or all over scalp. Massage thoroughly for 3-5 minutes to stimulate blood flow. Use daily for best results, preferably at night.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    related: [1, 5, 6]
  },
  {
    id: "4",
    name: "Shine Booster Serum",
    price: 32.99,
    rating: 4.7,
    reviews: 87,
    description: "Transform dull, lifeless hair into lustrous locks with our lightweight shine-enhancing serum. This non-greasy formula smooths the hair cuticle to reflect light better and give your hair a healthy, radiant appearance.",
    benefits: [
      "Adds brilliant shine without greasiness",
      "Smooths frizz and flyaways",
      "Protects hair from environmental damage",
      "Makes hair more manageable"
    ],
    ingredients: "Argan Oil, Jojoba Oil, Vitamin E, Camellia Oil, Avocado Oil, Shea Butter Extract, UV Protectants",
    directions: "Apply a small amount (2-3 drops) to palms and work through damp or dry hair, focusing on mid-lengths to ends. Can be used daily as needed.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    related: [2, 5, 6]
  },
  {
    id: "5",
    name: "Overnight Repair Treatment",
    price: 42.99,
    rating: 4.6,
    reviews: 112,
    description: "An intensive repair treatment designed to restore severely damaged hair. Works overnight to penetrate deep into hair shafts, repairing structure and restoring moisture balance to even the most damaged strands.",
    benefits: [
      "Repairs split ends and breakage",
      "Restores moisture to dry, damaged hair",
      "Rebuilds hair structure from within",
      "Improves elasticity and strength"
    ],
    ingredients: "Coconut Oil, Almond Oil, Shea Butter, Keratin Proteins, Vitamin E, Argan Oil, Olive Oil, Hibiscus Extract",
    directions: "Apply generously to dry hair before bed, focusing on damaged areas and ends. Cover with a silk or satin cap if desired. Wash out thoroughly in the morning. Use 1-2 times per week.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    related: [1, 3, 4]
  },
  {
    id: "6",
    name: "Curl Defining Oil",
    price: 36.99,
    rating: 4.8,
    reviews: 134,
    description: "Specifically formulated for curly and coily hair types, this defining oil enhances natural curl patterns while providing deep hydration. The lightweight formula defines and separates curls without weighing them down.",
    benefits: [
      "Enhances natural curl pattern",
      "Reduces frizz and adds definition",
      "Provides long-lasting moisture",
      "Protects against humidity"
    ],
    ingredients: "Coconut Oil, Shea Butter, Jojoba Oil, Flaxseed Extract, Aloe Vera Gel, Vitamin E, Essential Oils of Lavender and Ylang Ylang",
    directions: "Apply to damp hair after washing. Use 3-5 drops for fine hair, 5-7 for medium, and 7-10 for thick hair. Scrunch gently upward and allow to air dry or diffuse for best results.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    related: [2, 3, 5]
  }
];

// Mock reviews
const reviews = [
  {
    id: 1,
    name: "Sarah J.",
    rating: 5,
    date: "2023-04-10",
    comment: "This oil has completely transformed my hair! After using it for just a month, I've noticed significantly less hair fall and new growth around my temples. The scent is also divine - herbal but not overpowering."
  },
  {
    id: 2,
    name: "Michael T.",
    rating: 4,
    date: "2023-03-22",
    comment: "Great product that delivered on most of its promises. My scalp feels healthier and my hair is definitely shinier. The only reason I'm giving 4 stars instead of 5 is because the bottle is smaller than I expected for the price."
  },
  {
    id: 3,
    name: "Priya K.",
    rating: 5,
    date: "2023-03-15",
    comment: "As someone who has tried countless hair oils, this one stands out. The texture is perfect - not too thick or runny. It absorbs well without leaving my hair greasy, and the results are noticeable after just a few uses."
  }
];

const ProductDetail = () => {
  const { id } = useParams<{id: string}>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Find the product based on the ID from URL params
  const product = products.find(p => p.id === id);
  
  // Get related products
  const relatedProducts = product 
    ? product.related.map(relatedId => products.find(p => p.id === relatedId.toString())).filter(Boolean)
    : [];
  
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const addToCart = () => {
    if (product) {
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart.`,
      });
    }
  };
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted 
        ? `${product?.name} has been removed from your wishlist.`
        : `${product?.name} has been added to your wishlist.`,
    });
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-16">
            <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Button 
              onClick={() => window.location.href = '/shop'}
              className="bg-brand-green hover:bg-brand-green-dark"
            >
              Back to Shop
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container-custom py-12">
          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-brand-cream rounded-lg overflow-hidden">
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  className="w-full aspect-square object-contain p-4"
                />
              </div>
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`border rounded-md overflow-hidden w-20 h-20 ${activeImage === index ? 'border-brand-green' : 'border-border'}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <p className="text-2xl font-medium text-brand-green mb-6">
                ${product.price.toFixed(2)}
              </p>
              
              <p className="text-foreground/80 mb-6">
                {product.description}
              </p>
              
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    className="w-8 h-8 flex items-center justify-center border border-border rounded-l-md hover:bg-muted transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="w-12 h-8 flex items-center justify-center border-t border-b border-border">
                    {quantity}
                  </div>
                  <button 
                    onClick={increaseQuantity}
                    className="w-8 h-8 flex items-center justify-center border border-border rounded-r-md hover:bg-muted transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <Button 
                  onClick={addToCart}
                  className="flex-grow bg-brand-green hover:bg-brand-green-dark"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  onClick={toggleWishlist}
                  variant="outline"
                  className={`flex-grow ${isWishlisted ? 'bg-pink-50 border-pink-200 text-pink-500' : ''}`}
                >
                  <Heart size={18} className={`mr-2 ${isWishlisted ? 'fill-pink-500' : ''}`} />
                  {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>
              
              {/* Product Tabs */}
              <Tabs defaultValue="details">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Benefits:</h3>
                      <ul className="list-disc list-inside space-y-1 text-foreground/80">
                        {product.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Ingredients:</h3>
                      <p className="text-foreground/80">{product.ingredients}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="how-to-use" className="pt-6">
                  <h3 className="font-medium mb-3">Directions for Use:</h3>
                  <p className="text-foreground/80">{product.directions}</p>
                </TabsContent>
                
                <TabsContent value="reviews" className="pt-6">
                  <div className="space-y-6">
                    {reviews.map(review => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{review.name}</h3>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        
                        <p className="text-foreground/80">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-serif font-medium mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  relatedProduct && (
                    <div key={relatedProduct.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <a href={`/product/${relatedProduct.id}`} className="block">
                        <div className="aspect-square bg-brand-cream">
                          <img 
                            src={relatedProduct.images[0]} 
                            alt={relatedProduct.name} 
                            className="w-full h-full object-contain p-4"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium truncate">{relatedProduct.name}</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={i < Math.floor(relatedProduct.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground ml-1">({relatedProduct.rating})</span>
                          </div>
                          <p className="text-brand-green font-medium mt-2">${relatedProduct.price.toFixed(2)}</p>
                        </div>
                      </a>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
