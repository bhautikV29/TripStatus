"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Plane } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TripCard } from '@/components/trips/TripCard';
import { useTripStore } from '@/lib/store';
import { Trip } from '@/types/trip';

export default function TripsPage() {
  const { trips, setTrips, setLoading } = useTripStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Trip['status'] | 'all'>('all');

  useEffect(() => {
    async function fetchTrips() {
      try {
        setLoading(true);
        const response = await fetch('/api/trips');
        if (response.ok) {
          const apiTrips = await response.json();
          // Merge API trips with locally stored trips, avoiding duplicates
          const currentTrips = trips;
          const localTrips = currentTrips.filter(trip => 
            !apiTrips.some((apiTrip: Trip) => apiTrip.id === trip.id)
          );
          const allTrips = [...apiTrips, ...localTrips];
          setTrips(allTrips);
        }
      } catch (error) {
        console.error('Failed to fetch trips:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, [setTrips, setLoading]);

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.destinations.some(dest => dest.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || trip.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: trips.length,
    planned: trips.filter(t => t.status === 'planned').length,
    ongoing: trips.filter(t => t.status === 'ongoing').length,
    completed: trips.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Trips</h1>
          <p className="text-gray-600 mt-1">
            Manage and view all your planned adventures.
          </p>
        </div>
        <Link href="/trips/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Trip
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search trips, destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Badge
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setStatusFilter(status as Trip['status'] | 'all')}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Trips Grid */}
      <div>
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery || statusFilter !== 'all' ? 'No trips found' : 'No trips yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters.'
                : 'Start planning your first adventure!'
              }
            </p>
            {(!searchQuery && statusFilter === 'all') && (
              <Link href="/trips/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Plan Your First Trip
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}