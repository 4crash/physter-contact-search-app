import connection from '../eWayAPI/Connector'
import { Contact } from '../hooks/useContactHistory'

/**
 * Search for a contact by email using eWay-CRM API
 * @param email - Email address to search for
 * @returns Promise with Contact data or null if not found
 */
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

/**
 * Validate email format
 * @param email - Email to validate
 * @returns boolean
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Query key factory for React Query
 */
export const contactQueries = {
    all: () => ['contacts'] as const,
    search: (email: string) => [...contactQueries.all(), 'search', email] as const,
    detail: (id: string) => [...contactQueries.all(), 'detail', id] as const,
}
