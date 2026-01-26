import { useCallback, useEffect, useState } from 'react';
import { PhysterContactHistory } from '../types/PhysterContactHistory';


const STORAGE_KEY = 'contact_history'

export function useContactHistory() {
    const [history, setHistory] = useState<PhysterContactHistory[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load history from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                setHistory(JSON.parse(saved) as PhysterContactHistory[])
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

    const addContact = useCallback((contact: PhysterContactHistory) => {
        setHistory(prev => {
            const filtered = prev.filter(c => c.itemGuid !== contact.itemGuid)
            return [{ ...contact, lastUpdated: Date.now() }, ...filtered]
        })
    }, []) // ✅ Stable reference

    const updateContact = useCallback((contact: PhysterContactHistory) => {
        setHistory(prev =>
            prev.map(c => c.itemGuid === contact.itemGuid ? { ...contact, lastUpdated: Date.now() } : c)
        )
    }, [])

    const removeContact = useCallback((id: string) => {
        setHistory(prev => prev.filter(c => c.itemGuid !== id))
    }, [])

    const getContact = useCallback((id: string) => {
        return history.find(c => c.itemGuid === id)
    }, [history])

    const clearHistory = useCallback(() => {
        setHistory([])
    }, [])

    return {
        history,
        addContact,
        updateContact,
        removeContact,
        getContact,
        clearHistory,
        isLoaded
    }
};
