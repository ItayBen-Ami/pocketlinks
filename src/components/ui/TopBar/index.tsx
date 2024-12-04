import { ModeToggle } from '@components/ui/theme-toggle';
import { useTheme } from '@components/ui/theme-provider';
import { useMemo } from 'react';
import BlackLogo from '@/assets/pocketlinks-logo-blue-black.svg';
import WhiteLogo from '@/assets/pocketlinks-logo-blue-white.svg';
import GoogleSignInButton from './GoogleSignInButton';
import WelcomeMessage from './WelcomeMessage';
import { useUser } from '../../../contexts/UserContext';
import SignOutButton from './SignOutButton';
import { useMatch } from 'react-router-dom';
import { Button } from '../button';
import { CommandIcon } from 'lucide-react';
import { useCommandList } from '../../../contexts/CommandListContext';

export default function TopBar() {
  const { theme } = useTheme();
  const { user, isLoggedIn } = useUser();
  const match = useMatch('/lists/:listId/websites');

  const logo = useMemo(() => {
    // @ts-expect-error className is allowed
    const darkModeIcon = <WhiteLogo className="hidden md:block w-36" />;
    // @ts-expect-error className is allowed
    const lightModeIcon = <BlackLogo className="hidden md:block w-36" />;

    if (theme === 'dark') return darkModeIcon;
    if (theme === 'light') return lightModeIcon;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? darkModeIcon : lightModeIcon;
  }, [theme]);

  const { openModal } = useCommandList();

  return (
    <>
      <div className="flex justify-between items-center w-full top-0 sticky backdrop-blur-md p-4 border-b-2 border-border bg-transparent z-50">
        <div className="flex justify-start gap-4">
          {logo}
          <WelcomeMessage user={user} isLoggedIn={isLoggedIn} />
        </div>
        <div className="flex justify-end gap-4">
          {match && (
            <Button variant="outline" className="flex justify-between gap-8" onClick={openModal}>
              Search
              <div className="gap-1 hidden md:flex">
                <div className="p-2 bg-border rounded-sm">
                  <CommandIcon className="size-3" />
                </div>
                <div className="p-2 bg-border rounded-sm text-xs size-7 flex items-center justify-center">K</div>
              </div>
            </Button>
          )}
          {!isLoggedIn ? <GoogleSignInButton /> : <SignOutButton />}
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
