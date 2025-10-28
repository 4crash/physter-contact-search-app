import { useState } from 'react'
import { validateEmail } from '../utils/contactService'

interface ContactFormProps {
    onSearch: (email: string) => void
    loading: boolean
}

export default function ContactForm({ onSearch, loading }: ContactFormProps) {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!email.trim()) {
            setEmailError('Email is required')
            return
        }

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address')
            return
        }

        setEmailError('')
        onSearch(email)
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Search for a Contact</h2>

            <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter Contact Email
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setEmailError('')
                    }}
                    placeholder="contact@example.com"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition font-medium"
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {emailError && (
                <p className="text-red-600 text-sm mt-2">{emailError}</p>
            )}
        </form>
    )
}
