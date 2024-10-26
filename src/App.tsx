import { ThemeProvider } from '@/components/ui/theme-provider';
import UserProvider from './contexts/UserContext';
import { Toaster } from '@/components/ui/toaster';
import { getRouter } from './router/routes';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={getRouter(queryClient)} />
        <ThemeProvider>
          <Toaster />
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
