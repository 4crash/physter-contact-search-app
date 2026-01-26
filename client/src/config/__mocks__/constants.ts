/**
 * Mock configuration constants for Jest tests
 */

export const API_CONFIG = {
    BASE_URL: 'http://localhost:3001',
    TIMEOUT: 10000,
} as const;

export const CACHE_CONFIG = {
    STALE_TIME: 5 * 60 * 1000, // 5 minutes
    GC_TIME: 10 * 60 * 1000,   // 10 minutes
    RETRY_COUNT: 1,
    RETRY_DELAY: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
} as const;

export const STORAGE_KEYS = {
    CONTACT_HISTORY: 'contact_history',
} as const;

export const APP_LIMITS = {
    MAX_HISTORY_SIZE: 100,
} as const;
