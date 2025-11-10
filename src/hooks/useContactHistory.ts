import { useEffect, useState } from 'react';
interface EWaySearchResponse extends IApiResult {
    Data: EWayApiContactData[];
}
export interface Contact {
    // Mandatory fields
    itemGUID: string;
    fileAs: string;
    email1Address: string;
    telephoneNumber1: string;
    lastActivity: string;
    profilePicture?: string | null;
    profilePictureHeight?: number;
    profilePictureWidth?: number;

    // Address fields (at least one is mandatory)
    businessAddressStreet?: string;
    businessAddressCity?: string;
    businessAddressState?: string;
    businessAddressPostalCode?: string;
    homeAddressStreet?: string;
    homeAddressCity?: string;
    homeAddressState?: string;
    homeAddressPostalCode?: string;

    // Additional optional fields
    firstName?: string;
    lastName?: string;
    middleName?: string;
    company?: string;
    department?: string;
    note?: string;
    webPage?: string;
    itemChanged?: string;
    itemCreated?: string;

    // Local app fields
    lastUpdated: number;
}

const STORAGE_KEY = 'contact_history'

export function useContactHistory() {
    const [history, setHistory] = useState<Contact[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load history from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                setHistory(JSON.parse(saved) as Contact[])
            } catch (err) {
                console.error('Failed to parse contact history:', err)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save history to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
        }
    }, [history, isLoaded])

    const addContact = (contact: Contact) => {
        setHistory(prev => {
            // Remove if exists to avoid duplicates
            const filtered = prev.filter(c => c.itemGUID !== contact.itemGUID)
            // Add to top with updated timestamp
            return [{ ...contact, lastUpdated: Date.now() }, ...filtered]
        })
    }

    const updateContact = (contact: Contact) => {
        setHistory(prev =>
            prev.map(c => c.itemGUID === contact.itemGUID ? { ...contact, lastUpdated: Date.now() } : c)
        )
    }

    const removeContact = (id: string) => {
        setHistory(prev => prev.filter(c => c.itemGUID !== id))
    }

    const getContact = (id: string) => {
        return history.find(c => c.itemGUID === id)
    }

    const clearHistory = () => {
        setHistory([])
    }

    return {
        history,
        addContact,
        updateContact,
        removeContact,
        getContact,
        clearHistory,
        isLoaded
    }
}

