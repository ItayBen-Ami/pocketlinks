import { TypewriterEffect } from '@components/ui/typewriter-effect';
import BlackLogo from '@/assets/pocketlinks-logo-blue-black.svg';
import WhiteLogo from '@/assets/pocketlinks-logo-blue-white.svg';
import { useTheme } from '../components/ui/theme-provider';
import { Button } from '../components/ui/button';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import { supabase } from '@clients/supabase';
import IconCloud from '@components/ui/icon-cloud';

const slugs = [
  'typescript',
  'javascript',
  'react',
  'twitter',
  'nodedotjs',
  'express',
  'nextdotjs',
  'prisma',
  'amazonaws',
  'postgresql',
  'firebase',
  'nginx',
  'vercel',
  'testinglibrary',
  'jest',
  'cypress',
  'docker',
  'git',
  'jira',
  'github',
  'gitlab',
  'visualstudiocode',
  'google',
  'googledocs',
  'googledrive',
  'youtube',
  'twitch',
  'sonarqube',
  'vue',
  'figma',
  'supabase',
  'reddit',
  'spotify',
  'netflix',
];

export default function EntryPage() {
  // @ts-expect-error className is allowed
  const darkModeIcon = <WhiteLogo className="w-[60rem]" />;
  // @ts-expect-error className is allowed
  const lightModeIcon = <BlackLogo className="w-[60rem]" />;
  const { theme } = useTheme();

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
      <div className="flex flex-col items-center size-full mt-2">
        <div className="flex flex-col justify-center gap-2 items-center">
          <div>
            <div className="flex justify-center">{theme === 'dark' ? darkModeIcon : lightModeIcon}</div>
            <TypewriterEffect
              words={[
                { text: 'All your bookmarks, organized in ' },
                { text: 'one place', className: '!text-blue-500' },
              ]}
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex 2xl:size-full xl:size-96 max-w-lg items-center justify-center overflow-hidden rounded-lg border px-20 py-8">
              <IconCloud iconSlugs={slugs} />
            </div>
            <Button onClick={handleLogin}>Log In with Google</Button>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
