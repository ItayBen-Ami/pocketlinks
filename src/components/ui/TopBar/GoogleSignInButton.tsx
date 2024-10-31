import { Button } from '@components/ui/button';
import GoogleIcon from '@/assets/google-icon.svg';
import { supabase } from '@clients/supabase';

export default function GoogleSignInButton() {
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: import.meta.env.VITE_REDIRECT_URL,
      },
    });
  };

  return (
    <Button variant="link" className="flex gap-2" onClick={handleLogin}>
      {/*// @ts-expect-error className works*/}
      <GoogleIcon className="size-6 text-primary-foreground" />
      <div className="text-primary-foreground">Login</div>
    </Button>
  );
}
