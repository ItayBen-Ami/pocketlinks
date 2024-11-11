import { TypewriterEffect } from '@components/ui/typewriter-effect';
import BlackLogo from '@/assets/pocketlinks-logo-blue-black.svg';
import WhiteLogo from '@/assets/pocketlinks-logo-blue-white.svg';
import { Button } from '../components/ui/button';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import { supabase } from '@clients/supabase';

export default function EntryPage() {
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: import.meta.env.VITE_REDIRECT_URL,
      },
    });
  };

  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col justify-between items-center size-full pt-8 pb-20">
        <div className="flex flex-col justify-center gap-2 items-center">
          <div className="flex justify-center">
            <WhiteLogo className="w-[60rem] dark:block hidden" />
            <BlackLogo className="w-[60rem] dark:hidden block" />
          </div>
          <TypewriterEffect
            words={[{ text: 'All your bookmarks, organized in ' }, { text: 'one place', className: '!text-blue-500' }]}
          />
        </div>
        <Button onClick={handleLogin}>Log In with Google</Button>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
