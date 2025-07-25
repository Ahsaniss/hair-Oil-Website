import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserPlus, Shield } from 'lucide-react';

const AdminSetup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const makeAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.rpc('make_admin', {
        user_email: email.trim()
      });

      if (error) {
        throw error;
      }

      toast.success(`Successfully made ${email} an admin!`);
      setEmail('');
    } catch (error: any) {
      console.error('Error making user admin:', error);
      toast.error(error.message || 'Failed to make user admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Shield className="mx-auto h-12 w-12 text-brand-green" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Admin Setup</h1>
          <p className="mt-2 text-gray-600">Grant admin access to users</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="h-5 w-5 mr-2" />
              Make User Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={makeAdmin} className="space-y-4">
              <div>
                <Label htmlFor="email">User Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter user email to make admin"
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Processing...' : 'Make Admin'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Note: Users must be registered before you can make them an admin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;