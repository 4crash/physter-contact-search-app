import '@testing-library/jest-dom';

// Suppress act() warnings in tests - these are expected with React 18 + userEvent
const originalError = console.error;
beforeAll(() => {
    console.error = (...args: unknown[]) => {
        if (
            typeof args[0] === 'string' &&
            args[0].includes('Warning: An update to') &&
            args[0].includes('inside a test was not wrapped in act')
        ) {
            return;
        }
        originalError.call(console, ...(args as Parameters<typeof console.error>));
    };
});

afterAll(() => {
    console.error = originalError;
});

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key: jest.fn()
}

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});
