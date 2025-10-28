import { Contact } from '../hooks/useContactHistory'

interface ContactCardProps {
    contact: Contact
}

export default function ContactCard({ contact }: ContactCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
                {contact.avatar ? (
                    <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                        }}
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl font-bold text-white">
                            {contact.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}

                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        {contact.name}
                    </h2>

                    <div className="space-y-3 text-slate-700">
                        <div>
                            <span className="font-medium text-slate-900">Email:</span>
                            <p className="text-slate-600">{contact.email}</p>
                        </div>

                        {contact.phone && (
                            <div>
                                <span className="font-medium text-slate-900">Phone:</span>
                                <p className="text-slate-600">{contact.phone}</p>
                            </div>
                        )}

                        {contact.company && (
                            <div>
                                <span className="font-medium text-slate-900">Company:</span>
                                <p className="text-slate-600">{contact.company}</p>
                            </div>
                        )}

                        <div className="text-xs text-slate-500 pt-2">
                            Last updated: {new Date(contact.lastUpdated).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
