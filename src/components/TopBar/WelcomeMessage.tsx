import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../clients/supabase';
import { Session } from '@supabase/supabase-js';

export default function WelcomeMessage() {
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

  const username = useMemo(() => {
    if (session) {
      const user = session.user;
      return user.user_metadata.full_name.split(' ')[0];
    }
  }, [session]);

  return <div>Hi {username}</div>;
}
