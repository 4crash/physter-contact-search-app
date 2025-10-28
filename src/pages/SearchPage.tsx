import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactCard from '../components/ContactCard'
import ContactForm from '../components/ContactForm'
import { Contact, useContactHistory } from '../hooks/useContactHistory'
import { searchContactByEmail } from '../utils/contactService'

export default function SearchPage() {
    const navigate = useNavigate()
    const { addContact } = useContactHistory()
    const [currentContact, setCurrentContact] = useState<Contact | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSearch = async (email: string) => {
        setLoading(true)
        setError(null)
        setCurrentContact(null)

        try {
            const contact = await searchContactByEmail(email)

            if (!contact) {
                setError(`No contact found with email: ${email}`)
                return
            }

            setCurrentContact(contact)
            addContact(contact)
        } catch (err) {
            setError(`Error searching contact: ${err instanceof Error ? err.message : 'Unknown error'}`)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleViewDetails = () => {
        if (currentContact) {
            navigate(`/contact/${currentContact.id}`)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Contact Finder</h1>
                <p className="text-slate-600">Search for contacts in eWay-CRM and view their details</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <ContactForm onSearch={handleSearch} loading={loading} />

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h3 className="text-red-900 font-medium mb-1">Error</h3>
                            <p className="text-red-800">{error}</p>
                        </div>
                    )}

                    {currentContact && (
                        <div className="space-y-4">
                            <ContactCard contact={currentContact} />
                            <button
                                onClick={handleViewDetails}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                View Full Details
                            </button>
                        </div>
                    )}

                    {!currentContact && !loading && !error && (
                        <div className="bg-slate-100 border border-slate-300 rounded-lg p-8 text-center">
                            <p className="text-slate-600">
                                Enter an email address above to search for a contact
                            </p>
                        </div>
                    )}
                </div>

                {/* Tips sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="font-bold text-blue-900 mb-3">Tips</h3>
                        <ul className="text-sm text-blue-800 space-y-2">
                            <li>• Enter a valid email address to search</li>
                            <li>• Contact info is automatically saved to history</li>
                            <li>• Check the History page to see all your searches</li>
                            <li>• Contact data is stored locally in your browser</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
