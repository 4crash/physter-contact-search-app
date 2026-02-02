/**
 * Application configuration constants
 * Centralized location for all configuration values
 */

// Vite provides import.meta.env, but Jest doesn't support it
// This helper safely accesses the environment variable
const getApiBaseUrl = (): string => {
    try {
        //ts-expect-error - import.meta.env is available in Vite but not in Jest
        return import.meta.env?.VITE_API_BASE_URL || 'http://localhost:3001';
    } catch {
        return 'http://localhost:3001';
    }
};

/**
 * API Configuration
 */
export const API_CONFIG = {
    BASE_URL: getApiBaseUrl(),
    TIMEOUT: 10000,
} as const;

/**
 * React Query Cache Configuration
 */
export const CACHE_CONFIG = {
    STALE_TIME: 5 * 60 * 1000, // 5 minutes
    GC_TIME: 10 * 60 * 1000,   // 10 minutes
    RETRY_COUNT: 1,
    RETRY_DELAY: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
    CONTACT_HISTORY: 'contact_history',
} as const;

/**
 * Application Limits
 */
export const APP_LIMITS = {
    MAX_HISTORY_SIZE: 100, // Maximum number of contacts in history
} as const;
