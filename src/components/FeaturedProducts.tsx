
import { ShoppingCart } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Classic Hair Growth Oil",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Intense Repair Formula",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      tag: "New"
    },
    {
      id: 3,
      name: "Scalp Nourishment Blend",
      price: 27.99,
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      tag: ""
    },
    {
      id: 4,
      name: "Hair Strengthening Elixir",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      tag: "Limited"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Featured Products</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Discover our premium range of natural hair oils designed for different hair concerns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.tag && (
                  <span className="absolute top-4 right-4 bg-brand-green text-white px-3 py-1 text-xs font-medium rounded-full">
                    {product.tag}
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="font-serif text-lg font-medium mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">${product.price}</p>
                  <button className="bg-brand-green/10 hover:bg-brand-green text-brand-green hover:text-white p-2 rounded-full transition-colors">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="btn-secondary">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
