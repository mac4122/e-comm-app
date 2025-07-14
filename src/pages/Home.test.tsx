import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Home } from './Home'

vi.mock('lodash/debounce', () => ({
    default: (fn: Function) => {
        const debouncedFn = (...args: any[]) => fn(...args)
        debouncedFn.cancel = () => { }
        return debouncedFn as any
    },
}))

vi.mock('../components/Header', () => ({
    Header: () => <header>Header Component</header>,
}))
vi.mock('../components/ProductSearchInput', () => ({
    ProductSearchInput: ({ searchTerm, setSearchTerm }: any) => (
        <input
            aria-label="search-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
    ),
}))
vi.mock('../components/ProductSort', () => ({
    ProductSort: () => <div>ProductSort Component</div>,
}))
vi.mock('../components/ShowProducts', () => ({
    ShowProducts: () => <div>ShowProducts Component</div>,
}))

const mockDispatch = vi.fn()
const mockState = {
    data: [
        { id: 1, name: 'Apple', shortDescription: 'Fruit', suggestedPrice: 10, actualPrice: 8, image: '' },
        { id: 2, name: 'Banana', shortDescription: 'Fruit', suggestedPrice: 5, actualPrice: 4, image: '' },
    ],
    searchData: null,
}

vi.mock('../store/store', () => ({
    useAppContext: () => ({
        state: mockState,
        dispatch: mockDispatch,
    }),
}))

describe('Home component', () => {
    beforeEach(() => {
        mockDispatch.mockClear()
    })

    it('renders child components correctly', () => {
        render(<Home />)
        expect(screen.getByTestId('home')).toBeInTheDocument()
        expect(screen.getByText('Header Component')).toBeInTheDocument()
        expect(screen.getByLabelText('search-input')).toBeInTheDocument()
        expect(screen.getByText('ProductSort Component')).toBeInTheDocument()
        expect(screen.getByText('ShowProducts Component')).toBeInTheDocument()
    })

    it('dispatches LOAD_SEARCH_DATA with filtered results after typing', async () => {
        render(<Home />)
        const input = screen.getByLabelText('search-input')

        fireEvent.change(input, { target: { value: 'ap' } })

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'LOAD_SEARCH_DATA',
                payload: [
                    {
                        id: 1,
                        name: 'Apple',
                        shortDescription: 'Fruit',
                        suggestedPrice: 10,
                        actualPrice: 8,
                        image: '',
                    },
                ],
            })
        })
    })

    it('dispatches LOAD_SEARCH_DATA with null when search input is cleared', async () => {
        render(<Home />)
        const input = screen.getByLabelText('search-input')

        fireEvent.change(input, { target: { value: 'a' } })

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalled()
        })

        fireEvent.change(input, { target: { value: '' } })

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'LOAD_SEARCH_DATA',
                payload: null,
            })
        })
    })
})
