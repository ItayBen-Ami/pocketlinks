import { ThemeProvider } from '@/components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import WebsitesListPage from './pages/WebsitesListPage';
import TopBar from './components/TopBar';
import UserProvider from './contexts/UserContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <TopBar />
          <WebsitesListPage />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
