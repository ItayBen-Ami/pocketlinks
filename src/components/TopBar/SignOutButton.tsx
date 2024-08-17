import { Button } from '../../../components/ui/button';
import { supabase } from '../../clients/supabase';

export default function SignOutButton() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      window.location.reload();
    }
  };

  return (
    <Button variant="link" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
