import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Checkout } from './Checkout'

const mockNavigate = vi.fn()
let mockLocationState: any = null

vi.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: mockLocationState,
    }),
    useNavigate: () => mockNavigate,
}))

vi.mock('../components/Header', () => ({
    Header: () => <header>Header Component</header>,
}))

vi.mock('../components/CheckoutForm', () => ({
    default: (props: any) => <div>CheckoutForm Component - Product: {props.product.name}</div>,
}))

describe('Checkout component', () => {
    beforeEach(() => {
        mockNavigate.mockClear()
    })

    it('renders product info and components when product data is present', () => {
        mockLocationState = {
            id: 1,
            name: 'Test Product',
            shortDescription: 'Test Description',
            suggestedPrice: 100,
            actualPrice: 80,
            image: 'test.jpg',
        }

        render(<Checkout />)

        expect(screen.getByText('Header Component')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Test Product')
        expect(screen.getByText('Test Description')).toBeInTheDocument()
        expect(screen.getByText(/CheckoutForm Component - Product: Test Product/)).toBeInTheDocument()
    })

    it('redirects to "/" when product data is missing', () => {
        mockLocationState = null

        render(<Checkout />)

        expect(mockNavigate).toHaveBeenCalledWith('/')
    })
})
