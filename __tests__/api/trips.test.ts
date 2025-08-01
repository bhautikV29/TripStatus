import { GET, POST } from '@/app/api/trips/route';

describe('Trips API', () => {
  it('should return mock trips on GET', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('title');
  });

  it('should create a new trip on POST', async () => {
    const newTrip = {
      title: 'Test Trip',
      description: 'A test trip',
      startDate: '2024-12-25',
      endDate: '2024-12-30',
      destinations: ['Paris'],
      status: 'planned' as const,
      days: []
    };

    // Create a mock request object
    const request = {
      url: 'http://localhost:3000/api/trips',
      method: 'POST',
      headers: {
        get: (name: string) => {
          if (name === 'content-type') return 'application/json';
          return null;
        }
      },
      json: async () => newTrip
    } as any;

    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(201);
    expect(data).toHaveProperty('id');
    expect(data.title).toBe('Test Trip');
  });

  it('should return 400 for missing required fields', async () => {
    const invalidTrip = {
      description: 'A test trip without required fields',
      destinations: ['Paris'],
      status: 'planned' as const,
      days: []
    };

    // Create a mock request object
    const request = {
      url: 'http://localhost:3000/api/trips',
      method: 'POST',
      headers: {
        get: (name: string) => {
          if (name === 'content-type') return 'application/json';
          return null;
        }
      },
      json: async () => invalidTrip
    } as any;

    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
  });
}); 