import { TripService } from '@/lib/trip-service';
import { Trip } from '@/types/trip';

describe('TripService', () => {
  beforeEach(() => {
    // Clear any created trips before each test
    // In a real app, you'd reset the database
  });

  it('should return all trips including mock trips', () => {
    const trips = TripService.getAllTrips();
    expect(Array.isArray(trips)).toBe(true);
    expect(trips.length).toBeGreaterThan(0);
    expect(trips[0]).toHaveProperty('id');
    expect(trips[0]).toHaveProperty('title');
  });

  it('should create a new trip', () => {
    const newTrip: Trip = {
      id: 'test-1',
      title: 'Test Trip',
      description: 'A test trip',
      startDate: '2024-12-25',
      endDate: '2024-12-30',
      destinations: ['Paris'],
      status: 'planned',
      days: []
    };

    const createdTrip = TripService.createTrip(newTrip);
    expect(createdTrip.id).toBe('test-1');
    expect(createdTrip.title).toBe('Test Trip');

    // Verify it's in the list
    const allTrips = TripService.getAllTrips();
    const foundTrip = allTrips.find(t => t.id === 'test-1');
    expect(foundTrip).toBeDefined();
    expect(foundTrip?.title).toBe('Test Trip');
  });

  it('should find a trip by ID', () => {
    const newTrip: Trip = {
      id: 'test-2',
      title: 'Test Trip 2',
      description: 'Another test trip',
      startDate: '2024-12-25',
      endDate: '2024-12-30',
      destinations: ['London'],
      status: 'planned',
      days: []
    };

    TripService.createTrip(newTrip);
    const foundTrip = TripService.getTripById('test-2');
    expect(foundTrip).toBeDefined();
    expect(foundTrip?.title).toBe('Test Trip 2');
  });

  it('should return undefined for non-existent trip', () => {
    const foundTrip = TripService.getTripById('non-existent');
    expect(foundTrip).toBeUndefined();
  });
}); 