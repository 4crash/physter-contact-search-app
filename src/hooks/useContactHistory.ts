import { useEffect, useState } from 'react'

export interface Contact {
    id: string
    email: string
    name: string
    phone?: string
    company?: string
    avatar?: string
    lastUpdated: number
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
                setHistory(JSON.parse(saved))
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
            const filtered = prev.filter(c => c.id !== contact.id)
            // Add to top with updated timestamp
            return [{ ...contact, lastUpdated: Date.now() }, ...filtered]
        })
    }

    const updateContact = (contact: Contact) => {
        setHistory(prev =>
            prev.map(c => c.id === contact.id ? { ...contact, lastUpdated: Date.now() } : c)
        )
    }

    const removeContact = (id: string) => {
        setHistory(prev => prev.filter(c => c.id !== id))
    }

    const getContact = (id: string) => {
        return history.find(c => c.id === id)
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
