"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WeatherSection } from '@/components/weather/WeatherSection';
import { TravelModeIcon } from '@/components/trips/TravelModeIcon';
import { Trip } from '@/types/trip';
import { format, isValid } from 'date-fns';
import { useTripStore } from '@/lib/store';

// Helper function to safely format dates
const safeFormatDate = (dateString: string, formatString: string): string => {
  if (!dateString) return 'Date not specified';
  
  const date = new Date(dateString);
  if (!isValid(date)) return 'Invalid date';
  
  try {
    return format(date, formatString);
  } catch (error) {
    return 'Invalid date';
  }
};

export default function TripDetailPage() {
  const params = useParams();
  const { trips } = useTripStore();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTrip() {
      try {
        // First check if the trip is in the local store
        const localTrip = trips.find(t => t.id === params.id);
        if (localTrip) {
          setTrip(localTrip);
          setIsLoading(false);
          return;
        }

        // If not in local store, try to fetch from API
        const response = await fetch(`/api/trips/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setTrip(data);
        }
      } catch (error) {
        console.error('Failed to fetch trip:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrip();
  }, [params.id, trips]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip not found</h1>
        <Link href="/trips">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Trips
          </Button>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/trips">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{trip.title}</h1>
          <p className="text-gray-600 mt-1">{trip.description}</p>
        </div>
        <Badge className={getStatusColor(trip.status)}>
          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </Badge>
      </div>

      {/* Hero Image */}
      {trip.imageUrl && (
        <div className="relative h-80 w-full overflow-hidden rounded-xl">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trip Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Trip Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Duration</div>
                    <div className="text-sm text-gray-600">
                      {safeFormatDate(trip.startDate, 'MMM d')} - {safeFormatDate(trip.endDate, 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Destinations</div>
                    <div className="text-sm text-gray-600">
                      {trip.destinations.join(', ')}
                    </div>
                  </div>
                </div>

                {trip.totalCost && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Total Budget</div>
                      <div className="text-sm text-gray-600">
                        ${trip.totalCost.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Days</div>
                    <div className="text-sm text-gray-600">
                      {trip.days.length} day{trip.days.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Itinerary */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Itinerary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {trip.days.map((day, index) => (
                <div key={day.id} className="border-l-4 border-blue-500 pl-6 pb-6 last:pb-0">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                                      <div>
                    <h4 className="font-semibold text-lg">
                      {day.date ? safeFormatDate(day.date, 'EEEE, MMM d') : `Day ${index + 1}`}
                    </h4>
                    <p className="text-gray-600">{day.location || 'Location not specified'}</p>
                  </div>
                  </div>

                  {/* Activities */}
                  <div className="mb-4">
                    <h5 className="font-medium mb-2">Activities</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {day.activities.map((activity, actIndex) => (
                        <li key={actIndex}>{activity}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Travel Modes */}
                  {day.travelModes.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Transportation</h5>
                      <div className="space-y-2">
                        {day.travelModes.map((mode) => (
                          <div key={mode.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <TravelModeIcon mode={mode.type} className="w-5 h-5 text-blue-600" />
                            <div className="flex-1">
                              <div className="font-medium">{mode.from} → {mode.to}</div>
                              <div className="text-sm text-gray-600">
                                {mode.duration} • {mode.type.charAt(0).toUpperCase() + mode.type.slice(1)}
                                {mode.cost && ` • $${mode.cost}`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accommodation */}
                  {day.accommodation && (
                    <div>
                      <h5 className="font-medium mb-1">Accommodation</h5>
                      <p className="text-sm text-gray-600">{day.accommodation}</p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weather for each destination */}
          {trip.destinations.map((destination) => (
            <WeatherSection key={destination} location={destination} />
          ))}
        </div>
      </div>
    </div>
  );
}