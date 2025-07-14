import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as store from '../store/store'
import { BrowserRouter } from 'react-router-dom'
import { ShowProducts } from './ShowProducts'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

const sampleData = [
    {
        id: 1,
        name: 'Banana',
        shortDescription: 'Yellow fruit',
        suggestedPrice: 12,
        actualPrice: 10,
        image: 'banana.jpg',
    },
    {
        id: 2,
        name: 'Apple',
        shortDescription: 'Red fruit',
        suggestedPrice: 6,
        actualPrice: 5,
        image: 'apple.jpg',
    },
]

describe('ShowProducts component', () => {
    beforeEach(() => {
        mockNavigate.mockClear()
        vi.spyOn(store, 'useAppContext').mockReturnValue({
            state: {
                data: sampleData,
                searchData: null,
            },
            dispatch: vi.fn(),
        })
    })

    it('renders products with correct info and discount', () => {
        render(
            <BrowserRouter>
                <ShowProducts />
            </BrowserRouter>
        )

        sampleData.forEach(({ name, shortDescription, actualPrice, suggestedPrice }) => {
            expect(screen.getByText(name)).toBeInTheDocument()
            expect(screen.getByText(shortDescription)).toBeInTheDocument()

            const actualPriceMatches = screen.getAllByText(new RegExp(`\\b${actualPrice}\\b`))
            expect(actualPriceMatches.length).toBeGreaterThan(0)

            const suggestedPriceMatches = screen.getAllByText(new RegExp(`\\b${suggestedPrice}\\b`))
            expect(suggestedPriceMatches.length).toBeGreaterThan(0)
        })

        expect(screen.getAllByText(/% OFF/).length).toBe(2)
    })

    it('navigates to checkout with product state when Buy button clicked', () => {
        render(
            <BrowserRouter>
                <ShowProducts />
            </BrowserRouter>
        )

        const buyButtons = screen.getAllByText('Buy')
        fireEvent.click(buyButtons[0])

        expect(mockNavigate).toHaveBeenCalledTimes(1)
        expect(mockNavigate).toHaveBeenCalledWith('/checkout', {
            state: sampleData[0],
        })
    })
})
