import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProductSearchInput } from './ProductSearchInput'

describe('ProductSearchInput component', () => {
    it('renders input with provided searchTerm and calls setSearchTerm on change', () => {
        const mockSetSearchTerm = vi.fn()
        render(<ProductSearchInput searchTerm="test" setSearchTerm={mockSetSearchTerm} />)

        const input = screen.getByPlaceholderText('Search items...')
        expect(input).toBeInTheDocument()
        expect(input).toHaveValue('test')

        fireEvent.change(input, { target: { value: 'new search' } })
        expect(mockSetSearchTerm).toHaveBeenCalledWith('new search')
    })
})
