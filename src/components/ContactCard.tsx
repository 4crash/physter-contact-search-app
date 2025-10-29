import type { Contact } from '../hooks/useContactHistory';

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

    const getInitials = () => {
        if (contact.firstName && contact.lastName) {
            return `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase()
        }
        return contact.fileAs.charAt(0).toUpperCase()
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
                {contact.profilePicture ? (
                    <img
                        src={contact.profilePicture}
                        alt={contact.fileAs}
                        className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                        width={contact.profilePictureWidth}
                        height={contact.profilePictureHeight}
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                        }}
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl font-bold text-white">
                            {getInitials()}
                        </span>
                    </div>
                )}

                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        {contact.fileAs}
                    </h2>

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

                        <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                            Last activity: {new Date(contact.lastActivity).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
