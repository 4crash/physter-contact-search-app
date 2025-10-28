import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContactHistory } from '../hooks/useContactHistory'
import { searchContactByEmail } from '../utils/contactService'

export default function HistoryPage() {
    const navigate = useNavigate()
    const { history, removeContact, updateContact, clearHistory } = useContactHistory()
    const [refreshing, setRefreshing] = useState<string | null>(null)

    const handleRefreshContact = async (email: string, contactId: string) => {
        setRefreshing(contactId)
        try {
            const updated = await searchContactByEmail(email)
            if (updated) {
                updateContact({ ...updated, id: contactId })
            }
        } catch (err) {
            console.error('Failed to refresh contact:', err)
        } finally {
            setRefreshing(null)
        }
    }

    const handleClearHistory = () => {
        if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
            clearHistory()
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Contact History</h1>
                    <p className="text-slate-600">Recently searched contacts ({history.length})</p>
                </div>
                {history.length > 0 && (
                    <button
                        onClick={handleClearHistory}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                    >
                        Clear History
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="bg-slate-100 border border-slate-300 rounded-lg p-12 text-center">
                    <p className="text-slate-600 mb-4">No contacts in history yet</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Start Searching
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {history.map(contact => (
                        <div
                            key={contact.id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                {contact.avatar ? (
                                    <img
                                        src={contact.avatar}
                                        alt={contact.name}
                                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none'
                                        }}
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                                        <span className="text-lg font-bold text-white">
                                            {contact.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-900 truncate">
                                        {contact.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 truncate">
                                        {contact.email}
                                    </p>
                                </div>
                            </div>

                            {contact.company && (
                                <p className="text-sm text-slate-600 mb-3 truncate">
                                    <span className="font-medium">Company:</span> {contact.company}
                                </p>
                            )}

                            {contact.phone && (
                                <p className="text-sm text-slate-600 mb-3">
                                    <span className="font-medium">Phone:</span> {contact.phone}
                                </p>
                            )}

                            <p className="text-xs text-slate-500 mb-4">
                                Updated: {new Date(contact.lastUpdated).toLocaleDateString()}
                            </p>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/contact/${contact.id}`)}
                                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition font-medium"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleRefreshContact(contact.email, contact.id)}
                                    disabled={refreshing === contact.id}
                                    className="flex-1 px-3 py-2 bg-slate-200 text-slate-900 text-sm rounded-lg hover:bg-slate-300 disabled:bg-slate-100 transition font-medium"
                                >
                                    {refreshing === contact.id ? '...' : 'Refresh'}
                                </button>
                                <button
                                    onClick={() => removeContact(contact.id)}
                                    className="flex-1 px-3 py-2 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200 transition font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
