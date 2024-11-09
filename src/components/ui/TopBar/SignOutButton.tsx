import { Button } from '../../../components/ui/button';
import { supabase } from '@clients/supabase';

export default function SignOutButton() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Button variant="link" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
