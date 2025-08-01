import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Order {
  id: string;
  order_number: string | null;
  user_id: string | null;
  total_amount: number;
  status: string | null;
  shipping_address: any | null;
  billing_address: any | null;
  payment_method: string | null;
  payment_status: string | null;
  stripe_session_id: string | null;
  notes: string | null;
  tracking_number: string | null;
  estimated_delivery: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string | null;
  product_id: string | null;
  product_name: string;
  product_image: string | null;
  product_sku: string | null;
  quantity: number;
  price: number;
  created_at: string;
}

export const useMyOrders = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user,
  });
};

export const useAllOrders = () => {
  return useQuery({
    queryKey: ['orders', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          profiles (first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useOrder = (id: string | undefined) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      if (!id) throw new Error('Order ID is required');

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Order | null;
    },
    enabled: !!id,
  });
};

export interface CreateOrderData {
  items: Array<{
    product_id: string;
    product_name: string;
    product_image?: string;
    product_sku?: string;
    quantity: number;
    price: number;
  }>;
  shipping_address: any;
  billing_address?: any;
  payment_method?: string;
  notes?: string;
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (orderData: CreateOrderData) => {
      if (!user) throw new Error('User must be logged in');

      const total_amount = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total_amount,
          shipping_address: orderData.shipping_address,
          billing_address: orderData.billing_address,
          payment_method: orderData.payment_method,
          notes: orderData.notes,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        product_sku: item.product_sku,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create order: ${error.message}`);
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, tracking_number }: { id: string; status: string; tracking_number?: string }) => {
      const updateData: any = { status };
      if (tracking_number) updateData.tracking_number = tracking_number;

      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated');
    },
    onError: (error) => {
      toast.error(`Failed to update order: ${error.message}`);
    },
  });
};