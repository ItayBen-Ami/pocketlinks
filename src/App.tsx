import { ThemeProvider } from '@components/ui/theme-provider';
import UserProvider from './contexts/UserContext';
import { Toaster } from '@components/ui/toaster';
import { getRouter } from './router/routes';
import { RouterProvider } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function App() {
  const queryClient = useQueryClient();

  return (
    <UserProvider>
      <ThemeProvider>
        <RouterProvider router={getRouter(queryClient)} />
        <Toaster />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
