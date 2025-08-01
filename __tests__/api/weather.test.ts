import { GET } from '@/app/api/weather/route'
import { NextRequest } from 'next/server'

describe('/api/weather', () => {
  it('returns weather data for valid location', async () => {
    const request = new NextRequest('http://localhost:3000/api/weather?location=Paris')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('location')
    expect(data).toHaveProperty('temperature')
    expect(data).toHaveProperty('condition')
  })

  it('returns 400 for missing location parameter', async () => {
    const request = new NextRequest('http://localhost:3000/api/weather')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Location parameter is required')
  })
})