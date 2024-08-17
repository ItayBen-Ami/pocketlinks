import { Session, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../clients/supabase';

type UserState = {
  user: User | undefined;
  isLoggedIn: boolean;
  accessToken: string | undefined;
};

const UserContext = createContext<UserState>({
  user: undefined,
  isLoggedIn: false,
  accessToken: undefined,
});

export default function UserProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const getUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getUserSession();
  }, []);

  const [session, setSession] = useState<Session | null>();

  const value = useMemo(() => {
    return { user: session?.user, isLoggedIn: !!session, accessToken: session?.access_token };
  }, [session]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) throw new Error('useUser must be used within a UserProvider');

  return context;
};
