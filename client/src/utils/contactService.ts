import axios from 'axios';
import { PhysterContact } from '../../../common/types/PhysterContact.js';

const API_BASE_URL = 'http://localhost:3001';

// Type alias for better readability - PhysterContact IS the Contact type
export type Contact = PhysterContact;

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
        if (searchResult?.data?.[0]) {
            return searchResult.data[0];
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
        if (result?.data?.[0]) {
            return result.data[0];
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
