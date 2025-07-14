import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProductSort } from './ProductSort'
import * as store from '../store/store'

const mockDispatch = vi.fn()

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
    {
        id: 3,
        name: 'Carrot',
        shortDescription: 'Orange vegetable',
        suggestedPrice: 8,
        actualPrice: 7,
        image: 'carrot.jpg',
    },
]

describe('ProductSort component', () => {
    beforeEach(() => {
        mockDispatch.mockClear()
        vi.spyOn(store, 'useAppContext').mockReturnValue({
            state: {
                data: sampleData,
                searchData: null,
            },
            dispatch: mockDispatch,
        })
    })

    it('renders the select with default value', () => {
        render(<ProductSort />)
        const select = screen.getByLabelText(/Sort by/i)
        expect(select).toBeInTheDocument()
        expect(select).toHaveValue('')
    })

    it('dispatches sorted data when sort option changes', () => {
        render(<ProductSort />)
        const select = screen.getByLabelText(/Sort by/i)

        fireEvent.change(select, { target: { value: 'name-asc' } })

        expect(mockDispatch).toHaveBeenCalledTimes(2)
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'LOAD_DATA',
            payload: [
                {
                    id: 2,
                    name: 'Apple',
                    shortDescription: 'Red fruit',
                    suggestedPrice: 6,
                    actualPrice: 5,
                    image: 'apple.jpg',
                },
                {
                    id: 1,
                    name: 'Banana',
                    shortDescription: 'Yellow fruit',
                    suggestedPrice: 12,
                    actualPrice: 10,
                    image: 'banana.jpg',
                },
                {
                    id: 3,
                    name: 'Carrot',
                    shortDescription: 'Orange vegetable',
                    suggestedPrice: 8,
                    actualPrice: 7,
                    image: 'carrot.jpg',
                },
            ],
        })
    })

    it('uses searchData if present', () => {
        vi.spyOn(store, 'useAppContext').mockReturnValue({
            state: {
                data: sampleData,
                searchData: [
                    {
                        id: 3,
                        name: 'Carrot',
                        shortDescription: 'Orange vegetable',
                        suggestedPrice: 8,
                        actualPrice: 7,
                        image: 'carrot.jpg',
                    },
                    {
                        id: 1,
                        name: 'Banana',
                        shortDescription: 'Yellow fruit',
                        suggestedPrice: 12,
                        actualPrice: 10,
                        image: 'banana.jpg',
                    },
                ],
            },
            dispatch: mockDispatch,
        })

        render(<ProductSort />)
        const select = screen.getByLabelText(/Sort by/i)

        fireEvent.change(select, { target: { value: 'price-desc' } })

        expect(mockDispatch).toHaveBeenCalledTimes(2)
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'LOAD_SEARCH_DATA',
            payload: [
                {
                    id: 1,
                    name: 'Banana',
                    shortDescription: 'Yellow fruit',
                    suggestedPrice: 12,
                    actualPrice: 10,
                    image: 'banana.jpg',
                },
                {
                    id: 3,
                    name: 'Carrot',
                    shortDescription: 'Orange vegetable',
                    suggestedPrice: 8,
                    actualPrice: 7,
                    image: 'carrot.jpg',
                },
            ],
        })
    })
})
