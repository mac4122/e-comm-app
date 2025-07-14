import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { OrderConfirmation } from './OrderConfirmation'

const mockNavigate = vi.fn()
let mockState: any = null

vi.mock('react-router-dom', () => ({
    useLocation: () => ({ state: mockState }),
    useNavigate: () => mockNavigate,
}))

vi.mock('../components/Header', () => ({
    Header: () => <header>Header Component</header>,
}))

const productData = {
    id: 1,
    name: 'Test Product',
    shortDescription: 'Test product description',
    suggestedPrice: 100,
    actualPrice: 80,
    image: 'https://example.com/image.jpg',
}

describe('OrderConfirmation', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('redirects to / if productData is missing', () => {
        mockState = null
        render(<OrderConfirmation />)
        expect(mockNavigate).toHaveBeenCalledWith('/')
    })

    it('renders product info when productData exists', () => {
        mockState = productData
        render(<OrderConfirmation />)
        expect(screen.getByText('Header Component')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(productData.name)
        expect(screen.getByText(productData.shortDescription)).toBeInTheDocument()
        expect(
            screen.getByText(`you have been charged ${productData.actualPrice}`)
        ).toBeInTheDocument()
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
