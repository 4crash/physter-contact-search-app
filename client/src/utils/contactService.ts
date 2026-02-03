import axios from 'axios';
import { API_CONFIG } from '../config/constants';
import { PhysterContactHistory } from '../types/PhysterContactHistory';

function getCurrentUnixTimestamp(): number {
    return Math.floor(Date.now() / 1000);
}

/**
 * Search for a contact by email using local Express API
 * @param email - Email address to search for
 * @returns Promise with PhysterContactHistory data or null if not found
 */
export async function searchContactByEmail(email: string): Promise<PhysterContactHistory | null> {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}/contacts/search`, {
            params: { email }
        });

        const searchResult = response.data;
        if (searchResult?.data?.[0]) {
            return {
                ...searchResult.data[0],
                lastUpdated: getCurrentUnixTimestamp()
            };
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
 * @returns Promise with PhysterContactHistory data or null if not found
 */
export async function getContactByGuid(guid: string): Promise<PhysterContactHistory | null> {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}/contacts/${guid}`);
        const result = response.data;
        if (result?.data?.[0]) {
            return {
                ...result.data[0],
                lastUpdated: getCurrentUnixTimestamp()
            };
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
    search: (email: string | null) => [...contactQueries.all(), 'search', email] as const,
    detail: (id: string | null) => [...contactQueries.all(), 'detail', id] as const,
}
