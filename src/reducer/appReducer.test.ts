import { describe, it, expect } from 'vitest'
import { appReducer, initialState } from './appReducer'
import type { TProduct } from '../types/appTypes'

const mockProduct: TProduct = {
  id: 1,
  name: 'Test Product',
  shortDescription: 'Short desc',
  suggestedPrice: 100,
  actualPrice: 80,
  image: 'https://example.com/image.jpg',
}

describe('appReducer', () => {
  it('returns initial state for unknown action', () => {
    const newState = appReducer(initialState, { type: 'UNKNOWN' } as any)
    expect(newState).toEqual(initialState)
  })

  it('handles LOAD_DATA action', () => {
    const newState = appReducer(initialState, {
      type: 'LOAD_DATA',
      payload: [mockProduct],
    })

    expect(newState.data).toEqual([mockProduct])
    expect(newState.searchData).toBeNull()
  })

  it('handles LOAD_SEARCH_DATA action', () => {
    const newState = appReducer(initialState, {
      type: 'LOAD_SEARCH_DATA',
      payload: [mockProduct],
    })

    expect(newState.searchData).toEqual([mockProduct])
    expect(newState.data).toEqual([])
  })
})
