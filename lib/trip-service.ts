import { Trip } from '@/types/trip';
import { mockTrips } from './mock-data';

// In-memory storage for newly created trips
// In a real app, this would be a database
const createdTrips: Trip[] = [];

export class TripService {
  static getAllTrips(): Trip[] {
    return [...mockTrips, ...createdTrips];
  }

  static getTripById(id: string): Trip | undefined {
    const allTrips = this.getAllTrips();
    return allTrips.find(trip => trip.id === id);
  }

  static createTrip(trip: Trip): Trip {
    // Generate a unique ID if not provided
    const newTrip: Trip = {
      ...trip,
      id: trip.id || Date.now().toString(),
    };

    createdTrips.push(newTrip);
    return newTrip;
  }

  static updateTrip(id: string, updates: Partial<Trip>): Trip | null {
    const tripIndex = createdTrips.findIndex(trip => trip.id === id);
    if (tripIndex === -1) {
      return null;
    }

    createdTrips[tripIndex] = { ...createdTrips[tripIndex], ...updates } as Trip;
    return createdTrips[tripIndex] ?? null;
  }

  static deleteTrip(id: string): boolean {
    const tripIndex = createdTrips.findIndex(trip => trip.id === id);
    if (tripIndex === -1) {
      return false;
    }

    createdTrips.splice(tripIndex, 1);
    return true;
  }
} 