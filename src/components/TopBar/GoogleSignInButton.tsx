import { Button } from '@/components/ui/button';
import GoogleIcon from '@/assets/google-icon.svg';
import { supabase } from '../../clients/supabase';

export default function GoogleSignInButton() {
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <Button variant="outline" className="flex gap-2" onClick={handleLogin}>
      {/*// @ts-ignore */}
      <GoogleIcon className="size-6 text-primary-foreground" />
      <div className="text-primary-foreground">Login</div>
    </Button>
  );
}
