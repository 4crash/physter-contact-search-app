import { PhysterContactHistory } from '../types/PhysterContactHistory';

const ContactInformation = ({ contact }: { contact: PhysterContactHistory }) => {
    return (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <h3 className="font-bold text-slate-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-slate-600">Contact ID</p>
                    <p className="font-mono text-slate-900 break-all">{contact.itemGuid}</p>
                </div>

                <div>
                    <p className="text-slate-600">File As</p>
                    <p className="text-slate-900">{contact.fileAs}</p>
                </div>

                {contact.firstName && (
                    <div>
                        <p className="text-slate-600">First Name</p>
                        <p className="text-slate-900">{contact.firstName}</p>
                    </div>
                )}

                {contact.middleName && (
                    <div>
                        <p className="text-slate-600">Middle Name</p>
                        <p className="text-slate-900">{contact.middleName}</p>
                    </div>
                )}

                {contact.lastName && (
                    <div>
                        <p className="text-slate-600">Last Name</p>
                        <p className="text-slate-900">{contact.lastName}</p>
                    </div>
                )}

                <div>
                    <p className="text-slate-600">Email</p>
                    <p className="text-slate-900">{contact.email1Address}</p>
                </div>

                {contact.telephoneNumber1 && (
                    <div>
                        <p className="text-slate-600">Phone 1</p>
                        <p className="text-slate-900">{contact.telephoneNumber1}</p>
                    </div>
                )}

                {contact.telephoneNumber2 && (
                    <div>
                        <p className="text-slate-600">Phone 2</p>
                        <p className="text-slate-900">{contact.telephoneNumber2}</p>
                    </div>
                )}

                {contact.company && (
                    <div>
                        <p className="text-slate-600">Company</p>
                        <p className="text-slate-900">{contact.company}</p>
                    </div>
                )}

                {contact.department && (
                    <div>
                        <p className="text-slate-600">Department</p>
                        <p className="text-slate-900">{contact.department}</p>
                    </div>
                )}

                {contact.webPage && (
                    <div>
                        <p className="text-slate-600">Website</p>
                        <a href={contact.webPage} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {contact.webPage}
                        </a>
                    </div>
                )}

                {contact.businessAddressStreet && (
                    <div className="md:col-span-2">
                        <p className="text-slate-600">Business Address</p>
                        <p className="text-slate-900">
                            {contact.businessAddressStreet}
                            {contact.businessAddressCity && `, ${contact.businessAddressCity}`}
                            {contact.businessAddressState && `, ${contact.businessAddressState}`}
                            {contact.businessAddressPostalCode && ` ${contact.businessAddressPostalCode}`}
                        </p>
                    </div>
                )}

                {contact.homeAddressStreet && (
                    <div className="md:col-span-2">
                        <p className="text-slate-600">Home Address</p>
                        <p className="text-slate-900">
                            {contact.homeAddressStreet}
                            {contact.homeAddressCity && `, ${contact.homeAddressCity}`}
                            {contact.homeAddressState && `, ${contact.homeAddressState}`}
                            {contact.homeAddressPostalCode && ` ${contact.homeAddressPostalCode}`}
                        </p>
                    </div>
                )}

                {contact.note && (
                    <div className="md:col-span-2">
                        <p className="text-slate-600">Notes</p>
                        <p className="text-slate-900 whitespace-pre-wrap">{contact.note}</p>
                    </div>
                )}

                <div>
                    <p className="text-slate-600">Last Activity</p>
                    <p className="text-slate-900">
                        {new Date(contact.lastActivity).toLocaleString()}
                    </p>
                </div>

                {contact.itemCreated && (
                    <div>
                        <p className="text-slate-600">Created</p>
                        <p className="text-slate-900">
                            {new Date(contact.itemCreated).toLocaleString()}
                        </p>
                    </div>
                )}

                {contact.itemChanged && (
                    <div>
                        <p className="text-slate-600">Last Modified</p>
                        <p className="text-slate-900">
                            {new Date(contact.itemChanged).toLocaleString()}
                        </p>
                    </div>
                )}

                <div>
                    <p className="text-slate-600">Last Updated (Timestamp)</p>
                    <p className="text-slate-900">
                        {new Date(contact.lastUpdated * 1000).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default ContactInformation;