import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import './index.css'
import ContactDetailPage from './pages/ContactDetailPage'
import HistoryPage from './pages/HistoryPage'
import SearchPage from './pages/SearchPage'

// Create a client for React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes
            retry: 1,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
