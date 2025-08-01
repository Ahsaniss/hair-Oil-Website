import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    stock_quantity: number | null;
  };
}

export const useCartItems = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['cart-items', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('cart_items' as any)
        .select(`
          *,
          product:products(id, name, price, image_url, stock_quantity)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as any) as CartItem[];
    },
    enabled: !!user,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      if (!user) throw new Error('User must be logged in');

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items' as any)
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .maybeSingle();

        if (existingItem) {
        // Update existing item
        const { data, error } = await supabase
          .from('cart_items' as any)
          .update({ quantity: (existingItem as any).quantity + quantity })
          .eq('id', (existingItem as any).id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Create new item
        const { data, error } = await supabase
          .from('cart_items' as any)
          .insert([{
            user_id: user.id,
            product_id: productId,
            quantity
          }])
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items', user?.id] });
      toast.success('Added to cart');
    },
    onError: (error) => {
      toast.error(`Failed to add to cart: ${error.message}`);
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const { data, error } = await supabase
        .from('cart_items' as any)
        .update({ quantity })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items', user?.id] });
    },
    onError: (error) => {
      toast.error(`Failed to update cart: ${error.message}`);
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('cart_items' as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items', user?.id] });
      toast.success('Removed from cart');
    },
    onError: (error) => {
      toast.error(`Failed to remove from cart: ${error.message}`);
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User must be logged in');

      const { error } = await supabase
        .from('cart_items' as any)
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items', user?.id] });
      toast.success('Cart cleared');
    },
    onError: (error) => {
      toast.error(`Failed to clear cart: ${error.message}`);
    },
  });
};