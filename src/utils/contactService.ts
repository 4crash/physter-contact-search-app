import axios from 'axios';
import type { Contact } from '../hooks/useContactHistory';

const API_BASE_URL = 'http://localhost:3001';

/**
 * eWay-CRM API contact data structure
 */
interface EWayApiContactData extends Record<string, unknown> {

    ItemGUID: string;
    FileAs?: string;
    FirstName?: string;
    LastName?: string;
    Email1Address?: string;
    TelephoneNumber1?: string;
    TelephoneNumber2?: string;
    LastActivity?: string;
    ProfilePicture?: string | null;
    ProfilePictureHeight?: number;
    ProfilePictureWidth?: number;
    BusinessAddressStreet?: string;
    BusinessAddressCity?: string;
    BusinessAddressState?: string;
    BusinessAddressPostalCode?: string;
    HomeAddressStreet?: string;
    HomeAddressCity?: string;
    HomeAddressState?: string;
    HomeAddressPostalCode?: string;
    MiddleName?: string;
    Company?: string;
    Department?: string;
    Note?: string;
    WebPage?: string;
    ItemChanged?: string;
    ItemCreated?: string;
}

/**
 * eWay-CRM SearchContacts API response
 */
interface EWaySearchResponse extends IApiResult {
    Data: EWayApiContactData[];
}

/**
 * Map eWay-CRM API response to Contact interface
 */
function mapApiResponseToContact(data: EWayApiContactData, searchEmail: string): Contact {
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
 * Search for a contact by email using local Express API
 * @param email - Email address to search for
 * @returns Promise with Contact data or null if not found
 */
export async function searchContactByEmail(email: string): Promise<Contact | null> {
    try {
        const response = await axios.get(`${API_BASE_URL}/contacts/search`, {
            params: { email }
        });

        const searchResult = response.data;
        if (searchResult && searchResult.Data && searchResult.Data.length > 0) {
            const apiData = searchResult.Data[0];
            return mapApiResponseToContact(apiData, email);
        }
        return null;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        }
        throw error;
    }
}

/**
 * Get a contact by GUID using local Express API
 * @param guid - Contact GUID
 * @returns Promise with Contact data or null if not found
 */
export async function getContactByGuid(guid: string): Promise<Contact | null> {
    try {
        const response = await axios.get(`${API_BASE_URL}/contacts/${guid}`);
        const result = response.data;
        if (result && result.Data && result.Data.length > 0) {
            const apiData = result.Data[0];
            return mapApiResponseToContact(apiData, apiData.Email1Address || '');
        }
        return null;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
        }
        throw error;
    }
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
