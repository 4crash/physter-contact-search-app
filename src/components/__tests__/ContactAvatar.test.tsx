import { render, screen } from '@testing-library/react'
import ContactAvatar from '../ContactAvatar'

describe('ContactAvatar', () => {
  it('should render profile picture when provided', () => {
    render(
      <ContactAvatar
        profilePicture="data:image/jpeg;base64,/9j/4AAQSkZJRg=="
        fileAs="John Doe"
        className="w-12 h-12"
      />
    )

    const img = screen.getByRole('img', { name: 'John Doe' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'data:image/jpeg;base64,/9j/4AAQSkZJRg==')
    expect(img).toHaveClass('rounded-full', 'object-cover')
  })

  it('should render fallback avatar with initials when no picture', () => {
    const { container } = render(
      <ContactAvatar
        profilePicture={null}
        fileAs="Jane Smith"
        className="w-12 h-12"
      />
    )

    const avatar = container.querySelector('.bg-gradient-to-br')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveClass('w-12', 'h-12', 'rounded-full')
  })

  it('should extract first character from name for initials', () => {
    render(
      <ContactAvatar
        profilePicture={null}
        fileAs="Alice Johnson"
      />
    )

    const initials = screen.getByText('A')
    expect(initials).toBeInTheDocument()
  })

  it('should handle empty names gracefully', () => {
    const { container } = render(
      <ContactAvatar
        profilePicture={null}
        fileAs=""
      />
    )

    const initials = container.querySelector('span.text-white')
    expect(initials?.textContent).toBe('')
  })

  it('should convert raw Base64 to data URL automatically', () => {
    render(
      <ContactAvatar
        profilePicture="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        fileAs="Test User"
      />
    )

    const img = screen.getByRole('img', { name: 'Test User' })
    expect(img).toHaveAttribute('src')
    expect((img as HTMLImageElement).src).toMatch(/^data:image\/jpeg;base64,/)
  })

  it('should have correct alt text for accessibility', () => {
    render(
      <ContactAvatar
        profilePicture="data:image/jpeg;base64,/9j/4AAQSkZJRg=="
        fileAs="John Doe"
      />
    )

    const img = screen.getByRole('img', { name: 'John Doe' })
    expect(img).toBeInTheDocument()
  })

  it('should apply custom className prop', () => {
    const { container } = render(
      <ContactAvatar
        profilePicture={null}
        fileAs="Test User"
        className="custom-class"
      />
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('should render gradient background when no picture', () => {
    const { container } = render(
      <ContactAvatar
        profilePicture={null}
        fileAs="Test"
      />
    )

    const gradient = container.querySelector('.bg-gradient-to-br')
    expect(gradient).toHaveClass('from-blue-400', 'to-blue-600')
  })

  it('should render white text in avatar', () => {
    render(
      <ContactAvatar
        profilePicture={null}
        fileAs="Test"
      />
    )

    const text = screen.getByText('T')
    expect(text).toHaveClass('text-white')
  })
})
