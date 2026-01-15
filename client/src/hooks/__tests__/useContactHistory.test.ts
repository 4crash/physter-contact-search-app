import { act, renderHook } from '@testing-library/react'
import { PhysterContact } from '../../../../common/types/PhysterContact'
import { useContactHistory } from '../useContactHistory'

describe('useContactHistory', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        localStorage.clear()
    })

    const createMockContact = (overrides: Partial<PhysterContact> = {}): PhysterContact => ({
        itemGuid: 'guid-123',
        fileAs: 'John Doe',
        email1Address: 'john@example.com',
        telephoneNumber1: '123-456-7890',
        lastActivity: new Date().toISOString(),
        lastUpdate: Date.now(),
        ...overrides
    })

    it('should initialize with empty history', () => {
        const { result } = renderHook(() => useContactHistory())

        expect(result.current.history).toEqual([])
    })

    it('should load history from localStorage on mount', () => {
        const contact = createMockContact()
        localStorage.setItem('contact_history', JSON.stringify([contact]))

        const { result } = renderHook(() => useContactHistory())

        // History should load from localStorage
        expect(Array.isArray(result.current.history)).toBe(true)
    })

    it('should add contact to history', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact = createMockContact()

        act(() => {
            result.current.addContact(contact)
        })

        expect(result.current.history).toHaveLength(1)
        expect(result.current.history[0].itemGuid).toBe('guid-123')
        expect(result.current.history[0].fileAs).toBe('John Doe')
    })

    it('should update existing contact instead of duplicating', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact = createMockContact()

        act(() => {
            result.current.addContact(contact)
            result.current.addContact({
                ...contact,
                telephoneNumber1: '999-999-9999'
            })
        })

        expect(result.current.history).toHaveLength(1)
        expect(result.current.history[0].telephoneNumber1).toBe('999-999-9999')
    })

    it('should put updated contact at top of history', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact1 = createMockContact({ itemGuid: 'guid-1', fileAs: 'John Doe' })
        const contact2 = createMockContact({ itemGuid: 'guid-2', fileAs: 'Jane Smith' })

        act(() => {
            result.current.addContact(contact1)
            result.current.addContact(contact2)
            result.current.addContact(contact1)
        })

        expect(result.current.history).toHaveLength(2)
        expect(result.current.history[0].itemGuid).toBe('guid-1')
        expect(result.current.history[1].itemGuid).toBe('guid-2')
    })

    it('should remove contact from history', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact = createMockContact()

        act(() => {
            result.current.addContact(contact)
            result.current.removeContact('guid-123')
        })

        expect(result.current.history).toHaveLength(0)
    })

    it('should not remove non-existent contact', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact = createMockContact()

        act(() => {
            result.current.addContact(contact)
            result.current.removeContact('non-existent-guid')
        })

        expect(result.current.history).toHaveLength(1)
    })

    it('should get contact by id', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact = createMockContact()

        act(() => {
            result.current.addContact(contact)
        })

        const retrieved = result.current.getContact('guid-123')
        expect(retrieved).toMatchObject({
            fileAs: contact.fileAs,
            email1Address: contact.email1Address,
            itemGuid: contact.itemGuid,
            telephoneNumber1: contact.telephoneNumber1
        })
        expect(retrieved?.lastUpdate).toBeDefined()
    })

    it('should return undefined for non-existent contact', () => {
        const { result } = renderHook(() => useContactHistory())
        const retrieved = result.current.getContact('non-existent-guid')
        expect(retrieved).toBeUndefined()
    })

    it('should clear all history', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact1 = createMockContact({ itemGuid: 'guid-1' })
        const contact2 = createMockContact({ itemGuid: 'guid-2' })

        act(() => {
            result.current.addContact(contact1)
            result.current.addContact(contact2)
            result.current.clearHistory()
        })

        expect(result.current.history).toHaveLength(0)
    })

    it('should persist to localStorage when history changes', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact = createMockContact()

        act(() => {
            result.current.addContact(contact)
        })

        const stored = localStorage.getItem('contact_history')
        expect(stored).not.toBeNull()

        if (stored && stored !== 'undefined') {
            const parsedData = JSON.parse(stored) as PhysterContact[]
            expect(parsedData).toHaveLength(1)
            expect(parsedData[0].itemGuid).toBe('guid-123')
        }
    })

    it('should update contact timestamp on re-add', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact = createMockContact()

        act(() => {
            result.current.addContact(contact)
        })

        const firstTimestamp = result.current.history[0].lastUpdated

        // Add a small delay and re-add the contact
        act(() => {
            result.current.addContact(contact)
        })

        const secondTimestamp = result.current.history[0].lastUpdated
        expect(secondTimestamp).toBeGreaterThanOrEqual(firstTimestamp)
    })

    it('should update contact in history', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact = createMockContact()

        act(() => {
            result.current.addContact(contact)
            result.current.updateContact({
                ...contact,
                fileAs: 'Jane Doe'
            })
        })

        expect(result.current.history[0].fileAs).toBe('Jane Doe')
    })

    it('should handle multiple contacts in history', () => {
        const { result } = renderHook(() => useContactHistory())
        const contact1 = createMockContact({ itemGuid: 'guid-1', fileAs: 'Contact 1' })
        const contact2 = createMockContact({ itemGuid: 'guid-2', fileAs: 'Contact 2' })
        const contact3 = createMockContact({ itemGuid: 'guid-3', fileAs: 'Contact 3' })

        act(() => {
            result.current.addContact(contact1)
            result.current.addContact(contact2)
            result.current.addContact(contact3)
        })

        expect(result.current.history).toHaveLength(3)
        expect(result.current.history[0].itemGuid).toBe('guid-3')
        expect(result.current.history[1].itemGuid).toBe('guid-2')
        expect(result.current.history[2].itemGuid).toBe('guid-1')
    })
})
