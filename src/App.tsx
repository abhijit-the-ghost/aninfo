import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Browse } from './pages/Browse';
import { AnimeDetail } from './pages/AnimeDetail';
import { Watchlist } from './pages/Watchlist';
import { About } from './pages/About';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/aninfo" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="aninfo/browse" element={<Browse />} />
            <Route path="aninfo/anime/:id" element={<AnimeDetail />} />
            <Route path="aninfo/watchlist" element={<Watchlist />} />
            <Route path="aninfo/about" element={<About />} />
            <Route path="*" element={<div className="text-center py-20">Page Not Found</div>} />
            {/* Add other routes here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
