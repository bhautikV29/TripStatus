import { render, screen } from '@testing-library/react'
import { TripCard } from '@/components/trips/TripCard'
import { Trip } from '@/types/trip'

const mockTrip: Trip = {
  id: '1',
  title: 'Test Trip',
  description: 'A test trip description',
  startDate: '2024-06-15',
  endDate: '2024-06-20',
  destinations: ['Paris', 'London'],
  totalCost: 1500,
  status: 'planned',
  days: [],
}

describe('TripCard', () => {
  it('renders trip information correctly', () => {
    render(<TripCard trip={mockTrip} />)
    
    expect(screen.getByText('Test Trip')).toBeInTheDocument()
    expect(screen.getByText('A test trip description')).toBeInTheDocument()
    expect(screen.getByText('Paris → London')).toBeInTheDocument()
    expect(screen.getByText('$1,500')).toBeInTheDocument()
    expect(screen.getByText('Planned')).toBeInTheDocument()
  })

  it('displays correct status badge color', () => {
    render(<TripCard trip={mockTrip} />)
    
    const badge = screen.getByText('Planned')
    expect(badge).toHaveClass('bg-blue-100')
  })

  it('calculates duration correctly', () => {
    render(<TripCard trip={mockTrip} />)
    
    expect(screen.getByText('5 days')).toBeInTheDocument()
  })

  it('renders view details button', () => {
    render(<TripCard trip={mockTrip} />)
    
    const button = screen.getByRole('link', { name: /view details/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', '/trips/1')
  })
})