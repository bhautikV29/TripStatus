"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Trip, WeatherData } from '@/types/trip';

interface TripStore {
  trips: Trip[];
  selectedTrip: Trip | null;
  weather: Record<string, WeatherData>;
  isLoading: boolean;
  error: string | null;
  setTrips: (trips: Trip[]) => void;
  setSelectedTrip: (trip: Trip | null) => void;
  setWeather: (location: string, weather: WeatherData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, trip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
}

export const useTripStore = create<TripStore>()(
  persist(
    (set, get) => ({
      trips: [],
      selectedTrip: null,
      weather: {},
      isLoading: false,
      error: null,
      setTrips: (trips) => set({ trips }),
      setSelectedTrip: (trip) => set({ selectedTrip: trip }),
      setWeather: (location, weather) => 
        set(state => ({ weather: { ...state.weather, [location]: weather } })),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      addTrip: (trip) => set(state => ({ trips: [...state.trips, trip] })),
      updateTrip: (id, tripUpdate) => 
        set(state => ({
          trips: state.trips.map(trip => 
            trip.id === id ? { ...trip, ...tripUpdate } : trip
          )
        })),
      deleteTrip: (id) => 
        set(state => ({
          trips: state.trips.filter(trip => trip.id !== id),
          selectedTrip: state.selectedTrip?.id === id ? null : state.selectedTrip
        })),
    }),
    {
      name: 'trip-store',
      partialize: (state) => ({ trips: state.trips }),
    }
  )
);