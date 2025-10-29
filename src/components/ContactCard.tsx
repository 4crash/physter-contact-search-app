import type { Contact } from '../hooks/useContactHistory';
import ContactAvatar from './ContactAvatar';

interface ContactCardProps {
    contact: Contact;
}

export default function ContactCard({ contact }: ContactCardProps) {
    const getAddress = () => {
        const parts = []
        if (contact.businessAddressStreet) parts.push(contact.businessAddressStreet)
        if (contact.businessAddressCity) parts.push(contact.businessAddressCity)
        if (contact.businessAddressState) parts.push(contact.businessAddressState)
        if (contact.businessAddressPostalCode) parts.push(contact.businessAddressPostalCode)

        if (parts.length === 0) {
            if (contact.homeAddressStreet) parts.push(contact.homeAddressStreet)
            if (contact.homeAddressCity) parts.push(contact.homeAddressCity)
            if (contact.homeAddressState) parts.push(contact.homeAddressState)
            if (contact.homeAddressPostalCode) parts.push(contact.homeAddressPostalCode)
        }

        return parts.join(', ')
    }



    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">


                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        {contact.fileAs}
                    </h2>
                    <div className="flex">
                        <div className="flex-2 space-y-4">
                            <div className="space-y-3 text-slate-700">
                                <div>
                                    <span className="font-medium text-slate-900">Email:</span>
                                    <p className="text-slate-600">{contact.email1Address}</p>
                                </div>

                                {contact.telephoneNumber1 && (
                                    <div>
                                        <span className="font-medium text-slate-900">Phone:</span>
                                        <p className="text-slate-600">{contact.telephoneNumber1}</p>
                                    </div>
                                )}

                                {contact.company && (
                                    <div>
                                        <span className="font-medium text-slate-900">Company:</span>
                                        <p className="text-slate-600">{contact.company}</p>
                                    </div>
                                )}

                                {contact.department && (
                                    <div>
                                        <span className="font-medium text-slate-900">Department:</span>
                                        <p className="text-slate-600">{contact.department}</p>
                                    </div>
                                )}

                                {getAddress() && (
                                    <div>
                                        <span className="font-medium text-slate-900">Address:</span>
                                        <p className="text-slate-600">{getAddress()}</p>
                                    </div>
                                )}

                                {contact.webPage && (
                                    <div>
                                        <span className="font-medium text-slate-900">Website:</span>
                                        <p className="text-slate-600">
                                            <a href={contact.webPage} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {contact.webPage}
                                            </a>
                                        </p>
                                    </div>
                                )}

                                {contact.note && (
                                    <div>
                                        <span className="font-medium text-slate-900">Note:</span>
                                        <p className="text-slate-600">{contact.note}</p>
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                                Last activity: {new Date(contact.lastActivity).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center sm:justify-start mt-4'>
                    <ContactAvatar profilePicture={contact.profilePicture} fileAs={contact.fileAs} className="w-48 h-48 flex-shrink-0" />
                </div>

            </div>
        </div>
    )
}
