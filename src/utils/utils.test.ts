import { describe, expect, it } from 'vitest'
import { getDiscountPercentage } from './util'

describe('getDiscountPercentage', () => {
  it('calculates correct percentage for a valid discount', () => {
    expect(getDiscountPercentage(100, 80)).toBe('20.00')
    expect(getDiscountPercentage(200, 150)).toBe('25.00')
  })

  it('returns 0.00 when there is no discount', () => {
    expect(getDiscountPercentage(100, 100)).toBe('0.00')
  })

  it('handles fractional percentages correctly', () => {
    expect(getDiscountPercentage(100, 99)).toBe('1.00')
    expect(getDiscountPercentage(333, 300)).toBe('9.91')
  })

  it('returns "0.00" if price is zero to avoid division by zero', () => {
    expect(getDiscountPercentage(0, 0)).toBe('0.00')
    expect(getDiscountPercentage(0, 100)).toBe('0.00')
  })
})
