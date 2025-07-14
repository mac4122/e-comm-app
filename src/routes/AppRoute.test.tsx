import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppRoutes from './AppRoute'

vi.mock('../pages/Home', () => ({
  Home: () => <h1>Home Page</h1>,
}));
vi.mock('../pages/Checkout', () => ({
  Checkout: () => <h1>Checkout Page</h1>,
}));
vi.mock('../pages/OrderConfirmation', () => ({
  OrderConfirmation: () => <h1>Order Confirmation</h1>,
}));

const renderWithRoute = (initialRoute: string) => {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppRoutes />
    </MemoryRouter>
  );
};

describe('AppRoutes', () => {
  it('renders Home component for /home', () => {
    renderWithRoute('/home');
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders Checkout component for /checkout', () => {
    renderWithRoute('/checkout');
    expect(screen.getByText('Checkout Page')).toBeInTheDocument();
  });

  it('renders OrderConfirmation component for /confirmation', () => {
    renderWithRoute('/confirmation');
    expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
  });

  it('renders fallback for unknown routes', () => {
    renderWithRoute('/unknown-route');
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
