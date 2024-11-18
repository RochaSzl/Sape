// src/SupabaseContext.tsx
import { createContext, useContext } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Inicialize o cliente Supabase
const supabase = createClient(
  "https://olxfvicqflitnfwukmjr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9seGZ2aWNxZmxpdG5md3VrbWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NDgwMDQsImV4cCI6MjA0NjUyNDAwNH0.YxQRe9KX_npsPGMQJXeO3QwNtFUD_lKhtqvFzDQvm6w"
);

// Crie o contexto
const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

// Hook personalizado
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

// Provider component
interface SupabaseProviderProps {
  children: React.ReactNode;
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export { supabase };