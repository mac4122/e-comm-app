import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppProvider, useAppContext } from './store'
import { STORE_DATA } from '../constants/app-constants'

const TestComponent = () => {
  const { state } = useAppContext()

  return <div data-testid="data">{state.data.length}</div>
}

describe('AppProvider and useAppContext', () => {
  it('provides context with STORE_DATA and renders children', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )

    const data = screen.getByTestId('data')
    expect(data.textContent).toBe(String(STORE_DATA.length))
  })

  it('throws an error if useAppContext is used outside AppProvider', () => {
    const ConsoleError = console.error
    console.error = () => {}

    const BrokenComponent = () => {
      useAppContext()
      return null
    }

    expect(() => render(<BrokenComponent />)).toThrowError(
      'useAppContext must be used within an AppProvider'
    )

    console.error = ConsoleError
  })
})
