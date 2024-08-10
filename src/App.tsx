import './App.css'
import { ThemeProvider } from "../components/ui/theme-provider"
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import WebsitesListPage from './pages/WebsitesListPage'


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WebsitesListPage />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
