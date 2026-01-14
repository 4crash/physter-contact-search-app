import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Navigation */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="font-bold text-3xl text-blue-600">
                                <img src="https://www.physter.com/wp-content/uploads/2019/01/logo_HP_186x91.svg" alt="Logo" className="w-46 h-16" />
                            </span>
                            <span className="font-bold text-2xl hidden sm:inline text-slate-900">
                                Contact Finder
                            </span>
                        </Link>

                        <ul className="flex items-center gap-8">
                            <li>
                                <Link
                                    to="/"
                                    className="text-lg text-slate-600 hover:text-blue-600 font-medium transition"
                                >
                                    Search
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/history"
                                    className="text-lg text-slate-600 hover:text-blue-600 font-medium transition"
                                >
                                    History
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 mt-12">
                <div className="container mx-auto px-4 py-6 text-center text-slate-600 text-base">
                    <p>© 2025 PHYSTER-CRM. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
