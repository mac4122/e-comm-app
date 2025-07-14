import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { Header } from './Header'

describe('Header component', () => {
    it('renders a link to /home with the text Home', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )

        const link = screen.getByRole('link', { name: /home/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/home')
        expect(screen.getByText('Home')).toHaveClass('header-links')
    })
})
