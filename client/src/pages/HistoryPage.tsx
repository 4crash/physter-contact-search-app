import { useNavigate } from 'react-router-dom'
import ContactActionButtons from '../components/ContactActionButtons'
import ContactAvatar from '../components/ContactAvatar'
import useContactHistory from '../hooks/useContactHistory'
import { useRefreshContact } from '../hooks/useContactQuery'

export default function HistoryPage() {
    const navigate = useNavigate()
    const { history, removeContact, updateContact, clearHistory } = useContactHistory()
    const { mutate: refreshContact, isPending, variables } = useRefreshContact()

    const handleRefreshContact = (contactId: string) => {

        refreshContact(contactId, {

            onSuccess: (updated) => {
                if (updated) {
                    updateContact({ ...updated, itemGuid: contactId })
                }

            },
            onError: (error) => {
                console.error('Failed to refresh contact:', error)

            },
        })
    }

    const handleClearHistory = () => {
        if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
            clearHistory()
        }
    }

    const isRefreshing = (contactId: string) => {
        return isPending && variables === contactId;
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
                            key={contact.itemGuid}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition relative"
                        >
                            <div className='flex justify-between mb-4'>
                                <div className="flex-2">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-slate-900 truncate">
                                                {contact.fileAs}
                                            </h3>
                                            <p className="text-xs text-slate-500 truncate">
                                                {contact.email1Address}
                                            </p>
                                        </div>
                                    </div>

                                    {contact.company && (
                                        <p className="text-sm text-slate-600 mb-3 truncate">
                                            <span className="font-medium">Company:</span> {contact.company}
                                        </p>
                                    )}

                                    {contact.telephoneNumber1 && (
                                        <p className="text-sm text-slate-600 mb-3">
                                            <span className="font-medium">Phone:</span> {contact.telephoneNumber1}
                                        </p>
                                    )}

                                    <p className="text-xs text-slate-500 mb-8">
                                        Updated: {new Date(contact.lastActivity).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className='flex  '>
                                    <ContactAvatar profilePicture={contact.profilePicture} fileAs={contact.fileAs} className="w-16 h-16 flex-shrink-0" />
                                </div>
                            </div>
                            <div className="flex gap-2 w-full absolute bottom-2 ">
                                <ContactActionButtons
                                    itemGuid={contact.itemGuid}
                                    email={contact.email1Address}
                                    onRefresh={handleRefreshContact}
                                    onRemove={removeContact}
                                    isRefreshing={isRefreshing(contact.email1Address)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
