import { useNavigate, useParams } from 'react-router-dom'
import ContactCard from '../components/ContactCard'
import { useContactHistory } from '../hooks/useContactHistory'
import { useRefreshContact } from '../hooks/useContactQuery'

export default function ContactDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { getContact, updateContact } = useContactHistory()
    const { mutate: refreshContact, isPending: refreshing } = useRefreshContact()

    const contact = getContact(id || '')

    const handleRefresh = () => {
        if (!contact) return
        refreshContact(contact.email, {
            onSuccess: (updated) => {
                if (updated) {
                    updateContact(updated)
                }
            },
        })
    }

    if (!contact) {
        return (
            <div className="space-y-4">
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition"
                >
                    ← Back to Search
                </button>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h2 className="text-red-900 font-bold text-lg mb-2">Contact Not Found</h2>
                    <p className="text-red-800 mb-4">The contact you're looking for is not available.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition"
                >
                    ← Back to Search
                </button>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition font-medium"
                >
                    {refreshing ? 'Refreshing...' : 'Refresh Data'}
                </button>
            </div>

            <ContactCard contact={contact} />

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-slate-600">Contact ID</p>
                        <p className="font-mono text-slate-900 break-all">{contact.id}</p>
                    </div>
                    <div>
                        <p className="text-slate-600">Email</p>
                        <a
                            href={`mailto:${contact.email}`}
                            className="text-blue-600 hover:underline"
                        >
                            {contact.email}
                        </a>
                    </div>
                    {contact.phone && (
                        <div>
                            <p className="text-slate-600">Phone</p>
                            <a
                                href={`tel:${contact.phone}`}
                                className="text-blue-600 hover:underline"
                            >
                                {contact.phone}
                            </a>
                        </div>
                    )}
                    {contact.company && (
                        <div>
                            <p className="text-slate-600">Company</p>
                            <p className="text-slate-900">{contact.company}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-slate-600">Last Updated</p>
                        <p className="text-slate-900">
                            {new Date(contact.lastUpdated).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
