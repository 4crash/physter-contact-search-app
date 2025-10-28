import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import './index.css'
import ContactDetailPage from './pages/ContactDetailPage'
import HistoryPage from './pages/HistoryPage'
import SearchPage from './pages/SearchPage'

function App() {
    return (
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
    )
}

export default App
