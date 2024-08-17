import { ThemeProvider } from '@/components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import WebsitesListPage from './pages/WebsitesListPage';
import TopBar from './components/TopBar';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TopBar />
        <WebsitesListPage />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
