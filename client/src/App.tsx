import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { CACHE_CONFIG } from './config/constants'
import './index.css'
import ContactDetailPage from './pages/ContactDetailPage'
import HistoryPage from './pages/HistoryPage'
import SearchPage from './pages/SearchPage'

// Create a client for React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: CACHE_CONFIG.STALE_TIME,
            gcTime: CACHE_CONFIG.GC_TIME,
            retry: CACHE_CONFIG.RETRY_COUNT,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<SearchPage />} />
                        <Route path="/contact/:id" element={<ContactDetailPage />} />
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default App
