import { Link, useParams } from 'react-router-dom'
import ContactCard from '../components/ContactCard'
import ContactInformation from '../components/ContactInformation'
import { useContactHistory } from '../hooks/useContactHistory'
import { useRefreshContact } from '../hooks/useContactQuery'

export default function ContactDetailPage() {
    const { id } = useParams<{ id: string }>()

    const { getContact, updateContact } = useContactHistory()
    const { mutate: refreshContact, isPending: refreshing } = useRefreshContact()

    const contact = getContact(id || '')

    const handleRefresh = () => {
        if (!contact) return
        refreshContact(contact.itemGuid, {
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
                <Link
                    to="/"
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition"
                >
                    ← Back to Search
                </Link>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h2 className="text-red-900 font-bold text-lg mb-2">Contact Not Found</h2>
                    <p className="text-red-800 mb-4">The contact you're looking for is not available.</p>
                    <Link
                        to='/'
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Go Back
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Link
                    to="/"
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition"
                >
                    ← Back to Search
                </Link>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition font-medium"
                >
                    {refreshing ? 'Refreshing...' : 'Refresh Data'}
                </button>
            </div>

            <ContactCard contact={contact} />
            <ContactInformation contact={contact} />


        </div>
    )
}
