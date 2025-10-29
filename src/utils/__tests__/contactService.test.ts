import { contactQueries, validateEmail } from '../contactService'

describe('contactService', () => {
    describe('validateEmail', () => {
        it('should validate correct email formats', () => {
            expect(validateEmail('test@example.com')).toBe(true)
            expect(validateEmail('user.name@example.co.uk')).toBe(true)
            expect(validateEmail('user+tag@example.com')).toBe(true)
        })

        it('should reject invalid email formats', () => {
            expect(validateEmail('invalid')).toBe(false)
            expect(validateEmail('test@')).toBe(false)
            expect(validateEmail('@example.com')).toBe(false)
            expect(validateEmail('test@.com')).toBe(false)
            expect(validateEmail('')).toBe(false)
        })

        it('should handle edge cases', () => {
            expect(validateEmail('a@b.c')).toBe(true)
            expect(validateEmail('test@localhost')).toBe(false)
        })
    })

    describe('contactQueries', () => {
        it('should generate correct all() query key', () => {
            const key = contactQueries.all()
            expect(key).toEqual(['contacts'])
            expect(key[0]).toBe('contacts')
        })

        it('should generate correct search() query key', () => {
            const email = 'test@example.com'
            const key = contactQueries.search(email)
            expect(key).toEqual(['contacts', 'search', email])
            expect(key[2]).toBe(email)
        })

        it('should generate correct detail() query key', () => {
            const id = 'guid-123'
            const key = contactQueries.detail(id)
            expect(key).toEqual(['contacts', 'detail', id])
            expect(key[2]).toBe(id)
        })

        it('should generate unique keys for different inputs', () => {
            const key1 = contactQueries.search('test1@example.com')
            const key2 = contactQueries.search('test2@example.com')
            expect(key1).not.toEqual(key2)
        })
    })
})
