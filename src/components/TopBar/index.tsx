import { ModeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/components/ui/theme-provider';
import { useMemo } from 'react';
import BlackLogo from '@/assets/pocketlinks-logo-blue-black.svg';
import WhiteLogo from '@/assets/pocketlinks-logo-blue-white.svg';
import GoogleSignInButton from './GoogleSignInButton';
import WelcomeMessage from './WelcomeMessage';

export default function TopBar() {
  const { theme } = useTheme();

  const logo = useMemo(() => {
    // @ts-expect-error className is allowed
    const darkModeIcon = <WhiteLogo className="w-36" />;
    // @ts-expect-error className is allowed
    const lightModeIcon = <BlackLogo className="w-36" />;

    if (theme === 'dark') return darkModeIcon;
    if (theme === 'light') return lightModeIcon;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? darkModeIcon : lightModeIcon;
  }, [theme]);

  return (
    <div className="flex justify-between items-center w-full top-0 sticky backdrop-blur-md p-4 border-b-2 border-border">
      {logo}
      <WelcomeMessage />
      <GoogleSignInButton />
      <ModeToggle />
    </div>
  );
}
