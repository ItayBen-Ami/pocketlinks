import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { supabase } from '@clients/supabase';

export default function SignOutButton() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/', { replace: true });
  };

  return (
    <Button variant="link" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
