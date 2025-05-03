
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Star, ShoppingCart, Search } from "lucide-react";

// Mock product data (in a real app, this would come from an API/database)
const products = [
  {
    id: 1,
    name: "Root Revival Hair Oil",
    price: 34.99,
    rating: 4.8,
    image: "/placeholder.svg",
    hairType: ["dry", "damaged"],
    ingredients: ["coconut", "amla"]
  },
  {
    id: 2,
    name: "Scalp Soother Oil",
    price: 29.99,
    rating: 4.5,
    image: "/placeholder.svg",
    hairType: ["oily", "sensitive"],
    ingredients: ["neem", "tea tree"]
  },
  {
    id: 3,
    name: "Growth Elixir",
    price: 39.99,
    rating: 4.9,
    image: "/placeholder.svg",
    hairType: ["normal", "thinning"],
    ingredients: ["bhringraj", "rosemary"]
  },
  {
    id: 4,
    name: "Shine Booster Serum",
    price: 32.99,
    rating: 4.7,
    image: "/placeholder.svg",
    hairType: ["dull", "frizzy"],
    ingredients: ["argan", "jojoba"]
  },
  {
    id: 5,
    name: "Overnight Repair Treatment",
    price: 42.99,
    rating: 4.6,
    image: "/placeholder.svg",
    hairType: ["damaged", "color-treated"],
    ingredients: ["almond", "vitamin e"]
  },
  {
    id: 6,
    name: "Curl Defining Oil",
    price: 36.99,
    rating: 4.8,
    image: "/placeholder.svg",
    hairType: ["curly", "wavy"],
    ingredients: ["coconut", "shea"]
  }
];

// Hair type and ingredient filter options
const hairTypes = ["dry", "damaged", "oily", "sensitive", "normal", "thinning", "curly", "wavy", "color-treated", "frizzy", "dull"];
const ingredients = ["coconut", "amla", "neem", "tea tree", "bhringraj", "rosemary", "argan", "jojoba", "almond", "vitamin e", "shea"];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedHairTypes, setSelectedHairTypes] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // Filter products based on selections
  const filteredProducts = products.filter((product) => {
    // Search term filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Hair type filter
    if (selectedHairTypes.length > 0 && !selectedHairTypes.some(type => product.hairType.includes(type))) {
      return false;
    }
    
    // Ingredients filter
    if (selectedIngredients.length > 0 && !selectedIngredients.some(ing => product.ingredients.includes(ing))) {
      return false;
    }
    
    return true;
  });

  // Toggle hair type selection
  const toggleHairType = (hairType: string) => {
    setSelectedHairTypes(prev => 
      prev.includes(hairType) 
        ? prev.filter(type => type !== hairType) 
        : [...prev, hairType]
    );
  };

  // Toggle ingredient selection
  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(ing => ing !== ingredient) 
        : [...prev, ingredient]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Shop Hero */}
        <div className="bg-brand-green-light py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-green-dark mb-4">Our Products</h1>
            <p className="text-lg text-foreground/80 max-w-xl">
              Discover our collection of premium Ayurvedic hair oils, handcrafted with love and ancient wisdom.
            </p>
          </div>
        </div>

        {/* Shop Content */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border sticky top-24">
                <h2 className="text-xl font-medium mb-6">Filters</h2>
                
                {/* Search Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Search</h3>
                  <div className="relative">
                    <Input 
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Search size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider 
                      defaultValue={[0, 50]} 
                      min={0} 
                      max={50} 
                      step={1} 
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Hair Type Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Hair Type</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {hairTypes.map((hairType) => (
                      <div key={hairType} className="flex items-center">
                        <Checkbox 
                          id={`hair-${hairType}`} 
                          checked={selectedHairTypes.includes(hairType)}
                          onCheckedChange={() => toggleHairType(hairType)}
                        />
                        <Label 
                          htmlFor={`hair-${hairType}`}
                          className="ml-2 capitalize"
                        >
                          {hairType.replace('-', ' ')}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Ingredients Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Ingredients</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {ingredients.map((ingredient) => (
                      <div key={ingredient} className="flex items-center">
                        <Checkbox 
                          id={`ingredient-${ingredient}`}
                          checked={selectedIngredients.includes(ingredient)}
                          onCheckedChange={() => toggleIngredient(ingredient)}
                        />
                        <Label 
                          htmlFor={`ingredient-${ingredient}`}
                          className="ml-2 capitalize"
                        >
                          {ingredient.replace('-', ' ')}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow border-muted">
                      <div className="relative group">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Link 
                            to={`/product/${product.id}`}
                            className="bg-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-green hover:text-white transition-colors"
                          >
                            Quick View
                          </Link>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <Link to={`/product/${product.id}`} className="text-lg font-medium hover:text-brand-green transition-colors">
                            {product.name}
                          </Link>
                          <button 
                            className="text-foreground hover:text-brand-green transition-colors"
                            aria-label="Add to cart"
                          >
                            <ShoppingCart size={18} />
                          </button>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                        </div>
                        <div className="font-medium">${product.price.toFixed(2)}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium">No products found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
