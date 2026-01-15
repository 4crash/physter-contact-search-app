import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactCard from '../components/ContactCard'
import ContactForm from '../components/ContactForm'
import { useContactHistory } from '../hooks/useContactHistory'
import { useSearchContact } from '../hooks/useContactQuery'

export default function SearchPage() {
    const navigate = useNavigate()
    const { addContact } = useContactHistory()
    const addContactRef = useRef(addContact)

    const [searchEmail, setSearchEmail] = useState<string | null>(null)
    const { data: currentContact, isLoading, error } = useSearchContact(searchEmail, !!searchEmail)

    // Auto-add contact to history when successfully loaded
    useEffect(() => {
        if (currentContact && !error && !isLoading) {
            addContactRef.current(currentContact);
        }
    }, [currentContact, error, isLoading])

    const handleSearch = (email: string) => {
        setSearchEmail(email)
    }

    const handleViewDetails = () => {
        if (currentContact) {
            navigate(`/contact/${currentContact.itemGuid}`)
        }
    }

    const errorMessage = error ? `Error searching contact: ${error instanceof Error ? error.message : 'Unknown error'}` : null
    const notFoundMessage = !isLoading && searchEmail && !currentContact ? `No contact found with email: ${searchEmail}` : null

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Contact Finder</h1>
                <p className="text-slate-600">Search for contacts in Physter and view their details</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <ContactForm onSearch={handleSearch} loading={isLoading} />

                    {errorMessage && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h3 className="text-red-900 font-medium mb-1">Error</h3>
                            <p className="text-red-800">{errorMessage}</p>
                        </div>
                    )}

                    {notFoundMessage && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="text-yellow-900 font-medium mb-1">Not Found</h3>
                            <p className="text-yellow-800">{notFoundMessage}</p>
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

                    {!currentContact && !isLoading && !errorMessage && !notFoundMessage && (
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
                            <li>• Results are cached for faster access</li>
                            <li>• Profile pictures are displayed when available</li>
                            <li>• Sample Emails to try:</li>
                            <li>
                                <ul className="list-disc list-inside ml-4">
                                    <li>
                                        ealbares@gmail.com
                                    </li>
                                    <li>
                                        kati.rulapaugh@hotmail.com
                                    </li>
                                    <li>
                                        michael.ostrosky@ostrosky.com
                                    </li>
                                    <li>
                                        oliver@hotmail.com
                                    </li>

                                    <li>
                                        alice.j@test.com
                                    </li>
                                    <li>
                                        john.doe@example.com
                                    </li>
                                    <li>
                                        jane.smith@royster.com
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}