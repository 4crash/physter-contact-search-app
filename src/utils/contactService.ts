import connection from '../eWayAPI/Connector'
import type { Contact } from '../hooks/useContactHistory'

/**
 * Map eWay-CRM API response to Contact interface
 */
function mapApiResponseToContact(data: any, searchEmail: string): Contact {
    // Build address string from business or home address


    return {
        // Mandatory fields
        itemGUID: data.ItemGUID,
        fileAs: data.FileAs || `${data.FirstName || ''} ${data.LastName || ''}`.trim() || 'Unknown',
        email1Address: searchEmail || data.Email1Address || '',
        telephoneNumber1: data.TelephoneNumber1 || data.TelephoneNumber2 || '',
        lastActivity: data.LastActivity || new Date().toISOString(),
        profilePicture: data.ProfilePicture || null,
        profilePictureHeight: data.ProfilePictureHeight,
        profilePictureWidth: data.ProfilePictureWidth,

        // Address fields
        businessAddressStreet: data.BusinessAddressStreet,
        businessAddressCity: data.BusinessAddressCity,
        businessAddressState: data.BusinessAddressState,
        businessAddressPostalCode: data.BusinessAddressPostalCode,
        homeAddressStreet: data.HomeAddressStreet,
        homeAddressCity: data.HomeAddressCity,
        homeAddressState: data.HomeAddressState,
        homeAddressPostalCode: data.HomeAddressPostalCode,

        // Additional optional fields
        firstName: data.FirstName,
        lastName: data.LastName,
        middleName: data.MiddleName,
        company: data.Company,
        department: data.Department,
        note: data.Note,
        webPage: data.WebPage,
        itemChanged: data.ItemChanged,
        itemCreated: data.ItemCreated,

        // Local app field
        lastUpdated: Date.now()
    }
}

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
                        const apiData = result.Data[0]
                        const contact = mapApiResponseToContact(apiData, email)
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
