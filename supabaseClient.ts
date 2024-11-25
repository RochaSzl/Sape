import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olxfvicqflitnfwukmjr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9seGZ2aWNxZmxpdG5md3VrbWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NDgwMDQsImV4cCI6MjA0NjUyNDAwNH0.YxQRe9KX_npsPGMQJXeO3QwNtFUD_lKhtqvFzDQvm6w';

export const supabase = createClient(supabaseUrl, supabaseKey);