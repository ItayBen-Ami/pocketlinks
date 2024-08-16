import { ThemeProvider } from "@/components/ui/theme-provider"
import { ModeToggle } from "@/components/ui/theme-toggle"
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
        <div className='flex justify-end w-[80vw] top-4 absolute'>
          <ModeToggle />
        </div>
        <WebsitesListPage />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
