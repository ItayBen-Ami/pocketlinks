import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient } from '@tanstack/react-query';
import UserProvider from './contexts/UserContext.tsx';
import { CommandListProvider } from './contexts/CommandListContext.tsx';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity, refetchOnMount: true, refetchOnWindowFocus: true, gcTime: 1000 * 60 * 60 * 24 },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 23 }}>
      <UserProvider>
        <CommandListProvider>
          <App />
        </CommandListProvider>
      </UserProvider>
    </PersistQueryClientProvider>
  </StrictMode>,
);
