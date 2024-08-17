import { User } from '@supabase/supabase-js';

export default function WelcomeMessage({ user, isLoggedIn }: { user: User | undefined; isLoggedIn: boolean }) {
  if (!isLoggedIn || !user) {
    return <div>Welcome! Please log in to create a list</div>;
  }

  return <div>Hi, {user.user_metadata.full_name.split(' ')[0]}</div>;
}
