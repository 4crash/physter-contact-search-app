import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { contactQueries, searchContactByEmail } from '../utils/contactService'

/**
 * Hook to search for a contact by email
 */
export function useSearchContact(email: string | null, enabled: boolean = true) {
    return useQuery({
        queryKey: email ? contactQueries.search(email) : ['contacts', 'search', null],
        queryFn: () => {
            if (!email) return null
            return searchContactByEmail(email)
        },
        enabled: enabled && !!email,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
}

/**
 * Hook to get a contact by ID
 */
export function useGetContact(id: string | null) {
    return useQuery({
        queryKey: id ? contactQueries.detail(id) : ['contacts', 'detail', null],
        queryFn: () => {
            if (!id) return null
            // This would fetch from API if you have an endpoint
            // For now, it will be populated from cache or history
            return null
        },
        enabled: !!id,
    })
}

/**
 * Hook to refresh contact data
 */
export function useRefreshContact() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (email: string) => searchContactByEmail(email),
        onSuccess: (contact, email) => {
            if (contact) {
                // Update the query cache
                queryClient.setQueryData(
                    contactQueries.search(email),
                    contact
                )
                queryClient.setQueryData(
                    contactQueries.detail(contact.id),
                    contact
                )
            }
        },
        retry: 1,
    })
}

/**
 * Hook to invalidate all contact queries
 */
export function useInvalidateContacts() {
    const queryClient = useQueryClient()

    return {
        invalidateAll: () => queryClient.invalidateQueries({ queryKey: contactQueries.all() }),
        invalidateSearch: (email: string) => queryClient.invalidateQueries({ queryKey: contactQueries.search(email) }),
        invalidateDetail: (id: string) => queryClient.invalidateQueries({ queryKey: contactQueries.detail(id) }),
    }
}
