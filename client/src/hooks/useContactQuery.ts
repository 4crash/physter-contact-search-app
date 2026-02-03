import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CACHE_CONFIG } from '../config/constants'
import { contactQueries, getContactByGuid, searchContactByEmail } from '../utils/contactService'

/**
 * Hook to search for a contact by email
 */
export function useSearchContact(email: string | null) {
    return useQuery({
        queryKey: contactQueries.search(email),
        queryFn: () => {
            if (!email) return null
            return searchContactByEmail(email)
        },
        enabled: !!email,
        staleTime: CACHE_CONFIG.STALE_TIME,
        gcTime: CACHE_CONFIG.GC_TIME,
        retry: CACHE_CONFIG.RETRY_COUNT,
        retryDelay: CACHE_CONFIG.RETRY_DELAY,
    })
}

/**
 * Hook to get a contact by ID
 */
export function useGetContact(id: string | null) {
    return useQuery({
        queryKey: contactQueries.detail(id),
        queryFn: () => {
            if (!id) return null
            return getContactByGuid(id)
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
        mutationFn: (itemGuid: string) => getContactByGuid(itemGuid),
        onSuccess: (contact) => {
            if (contact) {
                // Update the query cache
                queryClient.setQueryData(
                    contactQueries.detail(contact.itemGuid),
                    contact
                )
            }
        },
        retry: CACHE_CONFIG.RETRY_COUNT,
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


