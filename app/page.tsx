"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Plane, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TripCard } from '@/components/trips/TripCard';
import { useTripStore } from '@/lib/store';

export default function Dashboard() {
  const { trips, setTrips, setLoading } = useTripStore();

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

  const stats = [
    {
      title: 'Total Trips',
      value: trips.length,
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Planned Trips',
      value: trips.filter(t => t.status === 'planned').length,
      icon: Calendar,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      title: 'Destinations',
      value: new Set(trips.flatMap(t => t.destinations)).size,
      icon: Plane,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Budget',
      value: `$${trips.reduce((sum, t) => sum + (t.totalCost || 0), 0).toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const upcomingTrips = trips
    .filter(t => t.status === 'planned')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's an overview of your trips.
          </p>
        </div>
        <Link href="/trips/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plane className="w-4 h-4 mr-2" />
            Plan New Trip
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Trips */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Upcoming Trips</CardTitle>
          <Link href="/trips">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {upcomingTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Plane className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No upcoming trips planned</p>
              <Link href="/trips/new">
                <Button>Plan Your First Trip</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}