import { render, screen, waitFor } from '@testing-library/react'
import { WeatherSection } from '@/components/weather/WeatherSection'

// Mock fetch
global.fetch = jest.fn()

describe('WeatherSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state initially', () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        location: 'Paris',
        temperature: 18,
        condition: 'sunny',
        humidity: 65,
        windSpeed: 3.2,
        forecast: []
      })
    })

    render(<WeatherSection location="Paris" />)
    
    expect(screen.getByText('Weather in Paris')).toBeInTheDocument()
    expect(screen.getByRole('generic', { hidden: true })).toHaveClass('animate-pulse')
  })

  it('displays weather data when loaded', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        location: 'Paris',
        temperature: 18,
        condition: 'sunny',
        humidity: 65,
        windSpeed: 3.2,
        forecast: []
      })
    })

    render(<WeatherSection location="Paris" />)
    
    await waitFor(() => {
      expect(screen.getByText('18°C')).toBeInTheDocument()
      expect(screen.getByText('sunny')).toBeInTheDocument()
      expect(screen.getByText('65%')).toBeInTheDocument()
      expect(screen.getByText('3.2 m/s')).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: false,
    })

    render(<WeatherSection location="Paris" />)
    
    await waitFor(() => {
      expect(screen.getByText('Weather data unavailable')).toBeInTheDocument()
    })
  })
})