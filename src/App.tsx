import { ThemeProvider } from '@components/ui/theme-provider';
import { Toaster } from '@components/ui/toaster';
import { getRouter } from './router/routes';
import { RouterProvider } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { TooltipProvider } from './components/ui/tooltip';
import { useUser } from './contexts/UserContext';

function App() {
  const queryClient = useQueryClient();

  const { isLoggedIn } = useUser();

  return (
    <ThemeProvider>
      <TooltipProvider>
        <RouterProvider router={getRouter(queryClient, isLoggedIn)} />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
