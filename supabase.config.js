import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://yjxbunoerggmxdukkcbi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqeGJ1bm9lcmdnbXhkdWtrY2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NDA0MjgsImV4cCI6MjA5MzUxNjQyOH0.tM-jTPNwqLQyEqgv0m-z4KefQogNmss1rAOJGjnxOUs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});