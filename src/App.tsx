import { ThemeProvider } from '@/components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import WebsitesListPage from './pages/WebsitesListPage';
import TopBar from './components/TopBar';
import UserProvider from './contexts/UserContext';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <Toaster />
          <TopBar />
          <WebsitesListPage />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
