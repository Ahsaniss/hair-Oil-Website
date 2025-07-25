// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ppquoktrocmqviloirbo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcXVva3Ryb2NtcXZpbG9pcmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MTM1OTksImV4cCI6MjA2ODQ4OTU5OX0.mAq2JCIrjShqVRUl-QePReBFGXpPFlNKgZaZyuXQcPM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});