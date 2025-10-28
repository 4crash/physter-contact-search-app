import connection from '../eWayAPI/Connector'
import { Contact } from '../hooks/useContactHistory'

export async function searchContactByEmail(email: string): Promise<Contact | null> {
    return new Promise((resolve, reject) => {
        try {
            connection.callMethod(
                'SearchContacts',
                {
                    transmitObject: {
                        Email1Address: email
                    },
                    includeProfilePictures: true
                },
                (result: any) => {
                    if (result && result.Data && result.Data.length > 0) {
                        const data = result.Data[0]
                        const contact: Contact = {
                            id: data.Id || `contact-${Date.now()}`,
                            email: email,
                            name: data.FileAs || data.FirstName || 'Unknown',
                            phone: data.Phone1 || data.MobilePhone || undefined,
                            company: data.Company || undefined,
                            avatar: data.Photo || undefined,
                            lastUpdated: Date.now()
                        }
                        resolve(contact)
                    } else {
                        resolve(null)
                    }
                },
                (error: any) => {
                    reject(error)
                }
            )
        } catch (error) {
            reject(error)
        }
    })
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
