import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Product type based on enhanced database schema
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock_quantity: number | null;
  is_featured: boolean | null;
  category_id: string | null;
  images: any[] | null;
  features: string[] | null;
  specifications: any | null;
  rating: number | null;
  review_count: number | null;
  tags: string[] | null;
  sku: string | null;
  weight: number | null;
  dimensions: any | null;
  created_at: string;
  updated_at: string;
  category?: {
    id: string;
    name: string;
    description: string | null;
  };
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories!category_id(id, name, description)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as any) as Product[];
    },
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories!category_id(id, name, description)
        `)
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as any) as Product[];
    },
  });
};

export const useProductsByCategory = (categoryId: string | null) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: async (): Promise<Product[]> => {
      if (!categoryId) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories!category_id(id, name, description)
        `)
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as any) as Product[];
    },
    enabled: Boolean(categoryId),
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories!category_id(id, name, description)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return (data as any) as Product | null;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create product: ${error.message}`);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...product }: Partial<Product> & { id: string }) => {
      const { category, ...productData } = product;
      const { data, error } = await supabase
        .from('products')
        .update(productData as any)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update product: ${error.message}`);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete product: ${error.message}`);
    },
  });
};