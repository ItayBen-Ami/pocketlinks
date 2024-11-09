import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProvider from './contexts/UserContext.tsx';
import { CommandListProvider } from './contexts/CommandListContext.tsx';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true, refetchOnWindowFocus: true } },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CommandListProvider>
          <App />
        </CommandListProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
);
