import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Address {
  id: string;
  user_id: string;
  type: 'shipping' | 'billing';
  first_name: string;
  last_name: string;
  company: string | null;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string | null;
  is_default: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useAddresses = (type?: 'shipping' | 'billing') => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['addresses', user?.id, type],
    queryFn: async () => {
      if (!user) return [];

      let query = supabase
        .from('addresses' as any)
        .select('*')
        .eq('user_id', user.id);

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query.order('is_default', { ascending: false });

      if (error) throw error;
      return (data as any) as Address[];
    },
    enabled: !!user,
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (address: Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('User must be logged in');

      const { data, error } = await supabase
        .from('addresses' as any)
        .insert([{ ...address, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', user?.id] });
      toast.success('Address saved successfully');
    },
    onError: (error) => {
      toast.error(`Failed to save address: ${error.message}`);
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, ...address }: Partial<Address> & { id: string }) => {
      const { data, error } = await supabase
        .from('addresses' as any)
        .update(address)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', user?.id] });
      toast.success('Address updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update address: ${error.message}`);
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('addresses' as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', user?.id] });
      toast.success('Address deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete address: ${error.message}`);
    },
  });
};