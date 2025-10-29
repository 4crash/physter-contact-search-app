import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '../ContactForm'

describe('ContactForm', () => {
    it('should render email input field', () => {
        const mockOnSearch = jest.fn()

        render(<ContactForm onSearch={mockOnSearch} loading={false} />)

        const input = screen.getByPlaceholderText('contact@example.com')
        expect(input).toBeInTheDocument()
    })

    it('should render submit button', () => {
        const mockOnSearch = jest.fn()

        render(<ContactForm onSearch={mockOnSearch} loading={false} />)

        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
    })

    it('should call onSearch with email value on submit', async () => {
        const mockOnSearch = jest.fn()
        const user = userEvent.setup()

        render(<ContactForm onSearch={mockOnSearch} loading={false} />)

        const input = screen.getByPlaceholderText('contact@example.com')

        await user.type(input, 'test@example.com')
        await user.click(screen.getByRole('button', { name: /search/i }))

        expect(mockOnSearch).toHaveBeenCalledWith('test@example.com')
    })

    it('should disable submit button while loading', () => {
        const mockOnSearch = jest.fn()

        render(<ContactForm onSearch={mockOnSearch} loading={true} />)

        const submitBtn = screen.getByRole('button', { name: /search/i })
        expect(submitBtn).toBeDisabled()
    })

    it('should enable submit button when not loading', () => {
        const mockOnSearch = jest.fn()

        render(<ContactForm onSearch={mockOnSearch} loading={false} />)

        const submitBtn = screen.getByRole('button', { name: /search/i })
        expect(submitBtn).not.toBeDisabled()
    })

    it('should handle form submission via Enter key', async () => {
        const mockOnSearch = jest.fn()
        const user = userEvent.setup()

        render(<ContactForm onSearch={mockOnSearch} loading={false} />)

        const input = screen.getByPlaceholderText('contact@example.com')

        await user.type(input, 'test@example.com')
        await user.keyboard('{Enter}')

        expect(mockOnSearch).toHaveBeenCalledWith('test@example.com')
    })

    it('should prevent submission with invalid email format', async () => {
        const mockOnSearch = jest.fn()
        const user = userEvent.setup()

        render(<ContactForm onSearch={mockOnSearch} loading={false} />)

        const input = screen.getByPlaceholderText('contact@example.com')

        await user.type(input, 'invalid-email')
        await user.click(screen.getByRole('button', { name: /search/i }))

        expect(mockOnSearch).not.toHaveBeenCalled()
    })

    it('should prevent submission with empty email', async () => {
        const mockOnSearch = jest.fn()
        const user = userEvent.setup()

        render(<ContactForm onSearch={mockOnSearch} loading={false} />)

        await user.click(screen.getByRole('button', { name: /search/i }))

        expect(mockOnSearch).not.toHaveBeenCalled()
    })

    it('should trim whitespace from email input', async () => {
        const mockOnSearch = jest.fn()
        const user = userEvent.setup()

        render(<ContactForm onSearch={mockOnSearch} loading={false} />)

        const input = screen.getByPlaceholderText('contact@example.com')

        await user.type(input, '  test@example.com  ')
        await user.click(screen.getByRole('button', { name: /search/i }))

        expect(mockOnSearch).toHaveBeenCalledWith('test@example.com')
    })
})
