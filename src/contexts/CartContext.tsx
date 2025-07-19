import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  maxQuantity?: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: any, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      
      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map(item =>
          item._id === product._id
            ? { 
                ...item, 
                quantity: Math.min(
                  item.quantity + quantity, 
                  product.inventory?.quantity || 999
                )
              }
            : item
        );
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0]?.url || '/placeholder.jpg',
          quantity: Math.min(quantity, product.inventory?.quantity || 999),
          maxQuantity: product.inventory?.quantity
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { 
              ...item, 
              quantity: Math.min(quantity, item.maxQuantity || 999)
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const isInCart = (productId: string): boolean => {
    return items.some(item => item._id === productId);
  };

  const getItemQuantity = (productId: string): number => {
    const item = items.find(item => item._id === productId);
    return item ? item.quantity : 0;
  };

  // Calculate derived values
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value: CartContextType = {
    items,
    itemCount,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default CartContext;