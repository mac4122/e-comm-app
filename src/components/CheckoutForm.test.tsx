import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CheckoutForm from './CheckoutForm'
import type { TProduct } from 'types/appTypes'
import { BrowserRouter } from 'react-router-dom'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

const product: TProduct = {
    id: 1,
    name: 'Sample Product',
    shortDescription: 'Description',
    suggestedPrice: 100,
    actualPrice: 90,
    image: 'image.jpg',
}

describe('CheckoutForm', () => {
    beforeEach(() => {
        mockNavigate.mockClear()
        render(
            <BrowserRouter>
                <CheckoutForm product={product} />
            </BrowserRouter>
        )
    })

    it('renders all input fields and submit button', () => {
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Address/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Credit Card Number/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /submit order/i })).toBeInTheDocument()
    })

    it('shows validation errors on empty submit', async () => {
        fireEvent.click(screen.getByRole('button', { name: /submit order/i }))

        expect(await screen.findAllByText(/is required/i)).toHaveLength(5)
    })

    it('validates fullName to contain only letters and spaces', async () => {
        const fullNameInput = screen.getByLabelText(/Full Name/i)
        await userEvent.type(fullNameInput, 'John123')
        fireEvent.click(screen.getByRole('button', { name: /submit order/i }))

        expect(await screen.findByText(/must contain only letters and spaces/i)).toBeInTheDocument()
    })

    it('validates email format', async () => {
        const emailInput = screen.getByLabelText(/Email/i)
        await userEvent.type(emailInput, 'invalid-email')
        fireEvent.click(screen.getByRole('button', { name: /submit order/i }))

        expect(await screen.findByText(/invalid email/i)).toBeInTheDocument()
    })

    it('validates phone number format and formats input correctly', async () => {
        const phoneInput = screen.getByLabelText(/Phone Number/i)

        await userEvent.type(phoneInput, '1234567890')

        expect(phoneInput).toHaveValue('123-456-7890')

        fireEvent.change(phoneInput, { target: { value: '123-45' } })
        fireEvent.click(screen.getByRole('button', { name: /submit order/i }))

        expect(await screen.findByText(/must be in the format xxx-xxx-xxxx/i)).toBeInTheDocument()
    })

    it('accepts only numeric input for credit card and limits length to 19', async () => {
        const ccInput = screen.getByLabelText(/Credit Card Number/i)

        await userEvent.type(ccInput, '1234abcd5678efgh90123')

        expect(ccInput).toHaveValue('1234567890123')

        userEvent.clear(ccInput)

        await userEvent.type(ccInput, '123456789012345678901234')
        expect(ccInput).toHaveValue('1234567890123456789')
    })

    it('navigates to /confirmation with product on valid submit', async () => {
        await userEvent.type(screen.getByLabelText(/Full Name/i), 'John Doe')
        await userEvent.type(screen.getByLabelText(/Address/i), '123 Street')
        await userEvent.type(screen.getByLabelText(/Email/i), 'john@example.com')
        await userEvent.type(screen.getByLabelText(/Phone Number/i), '1234567890')
        await userEvent.type(screen.getByLabelText(/Credit Card Number/i), '1234567890123456789')

        fireEvent.click(screen.getByRole('button', { name: /submit order/i }))

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledTimes(1)
            expect(mockNavigate).toHaveBeenCalledWith('/confirmation', { state: product })
        })
    })
})
