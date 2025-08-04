"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTripStore } from '@/lib/store';
import { Trip, DayItinerary } from '@/types/trip';

export default function NewTripPage() {
  const router = useRouter();
  const { addTrip } = useTripStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    destinations: [''],
    totalCost: '',
    status: 'planned' as Trip['status'],
    imageUrl: ''
  });

  const [days, setDays] = useState<Partial<DayItinerary>[]>([{
    date: '',
    location: '',
    activities: [''],
    travelModes: [],
    accommodation: ''
  }]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDestinationChange = (index: number, value: string) => {
    const newDestinations = [...formData.destinations];
    newDestinations[index] = value;
    setFormData(prev => ({ ...prev, destinations: newDestinations }));
  };

  const addDestination = () => {
    setFormData(prev => ({ ...prev, destinations: [...prev.destinations, ''] }));
  };

  const removeDestination = (index: number) => {
    if (formData.destinations.length > 1) {
      const newDestinations = formData.destinations.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, destinations: newDestinations }));
    }
  };

  const handleDayChange = (dayIndex: number, field: string, value: string) => {
    const newDays = [...days];
    newDays[dayIndex] = { ...newDays[dayIndex], [field]: value };
    setDays(newDays);
  };

  const handleActivityChange = (dayIndex: number, activityIndex: number, value: string) => {
    const newDays = [...days];
    const day = newDays[dayIndex];
    if (day) {
      const activities = [...(day.activities || [''])];
      activities[activityIndex] = value;
      newDays[dayIndex] = { ...day, activities };
      setDays(newDays);
    }
  };

  const addActivity = (dayIndex: number) => {
    const newDays = [...days];
    const day = newDays[dayIndex];
    if (day) {
      const activities = [...(day.activities || [])];
      activities.push('');
      newDays[dayIndex] = { ...day, activities };
      setDays(newDays);
    }
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const newDays = [...days];
    const day = newDays[dayIndex];
    if (day) {
      const activities = (day.activities || []).filter((_, i) => i !== activityIndex);
      newDays[dayIndex] = { ...day, activities };
      setDays(newDays);
    }
  };

  const addDay = () => {
    setDays(prev => [...prev, {
      date: '',
      location: '',
      activities: [''],
      travelModes: [],
      accommodation: ''
    }]);
  };

  const removeDay = (index: number) => {
    if (days.length > 1) {
      setDays(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validate that all days have dates and locations
    const invalidDays = days
      .map((day, index) => ({ day, index }))
      .filter(({ day }) => !day.date || !day.location);
    
    const missingDates = invalidDays
      .filter(({ day }) => !day.date)
      .map(({ index }) => index + 1);
    
    const missingLocations = invalidDays
      .filter(({ day }) => !day.location)
      .map(({ index }) => index + 1);
    
    if (missingDates.length > 0) {
      alert(`Please fill in the date for Day${missingDates.length > 1 ? 's' : ''} ${missingDates.join(', ')}`);
      return;
    }
    
    if (missingLocations.length > 0) {
      alert(`Please fill in the location for Day${missingLocations.length > 1 ? 's' : ''} ${missingLocations.join(', ')}`);
      return;
    }
    
    setIsSubmitting(true);
    
    const tripData: Partial<Trip> = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      destinations: formData.destinations.filter(d => d.trim() !== ''),
      status: formData.status,
      imageUrl: formData.imageUrl || 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800',
      days: days.map((day, index) => {
        // Calculate a date for each day based on trip start date
        const dayDate = day.date || (() => {
          const startDate = new Date(formData.startDate);
          startDate.setDate(startDate.getDate() + index);
          return startDate.toISOString().split('T')[0];
        })();
        
        return {
          id: `${Date.now()}-${index}`,
          date: dayDate,
          location: day.location || 'Location not specified',
          activities: (day.activities || []).filter(a => a.trim() !== ''),
          travelModes: day.travelModes || [],
          accommodation: day.accommodation
        };
      }) as DayItinerary[]
    };

    if (formData.totalCost) {
      tripData.totalCost = parseInt(formData.totalCost);
    }

    const newTrip = tripData as Trip;

    try {
      // Send to API
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrip),
      });

      if (response.ok) {
        const createdTrip = await response.json();
        addTrip(createdTrip);
        router.push('/trips');
      } else {
        const error = await response.json();
        console.error('Failed to create trip:', error);
        alert('Failed to create trip. Please try again.');
      }
    } catch (error) {
      console.error('Error creating trip:', error);
      alert('Failed to create trip. Please try again.');
    } finally {
      setIsSubmitting(false);
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plan New Trip</h1>
          <p className="text-gray-600 mt-1">Create your next adventure</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Trip Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., European Adventure"
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your trip..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="totalCost">Total Budget ($)</Label>
                <Input
                  id="totalCost"
                  type="number"
                  value={formData.totalCost}
                  onChange={(e) => handleInputChange('totalCost', e.target.value)}
                  placeholder="2500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL (optional)</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Destinations */}
        <Card>
          <CardHeader>
            <CardTitle>Destinations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.destinations.map((destination, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={destination}
                  onChange={(e) => handleDestinationChange(index, e.target.value)}
                  placeholder="e.g., Paris, France"
                  required
                />
                {formData.destinations.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeDestination(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addDestination}>
              <Plus className="w-4 h-4 mr-2" />
              Add Destination
            </Button>
          </CardContent>
        </Card>

        {/* Daily Itinerary */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Itinerary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {days.map((day, dayIndex) => (
              <div key={dayIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Day {dayIndex + 1}</h4>
                  {days.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeDay(dayIndex)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={day.date || ''}
                      onChange={(e) => handleDayChange(dayIndex, 'date', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Location *</Label>
                    <Input
                      value={day.location || ''}
                      onChange={(e) => handleDayChange(dayIndex, 'location', e.target.value)}
                      placeholder="e.g., Paris"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Activities</Label>
                  <div className="space-y-2">
                    {(day.activities || ['']).map((activity, activityIndex) => (
                      <div key={activityIndex} className="flex gap-2">
                        <Input
                          value={activity}
                          onChange={(e) => handleActivityChange(dayIndex, activityIndex, e.target.value)}
                          placeholder="e.g., Visit Eiffel Tower"
                        />
                        {(day.activities || []).length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeActivity(dayIndex, activityIndex)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addActivity(dayIndex)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Activity
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Accommodation (optional)</Label>
                  <Input
                    value={day.accommodation || ''}
                    onChange={(e) => handleDayChange(dayIndex, 'accommodation', e.target.value)}
                    placeholder="e.g., Hotel Le Meurice"
                  />
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addDay}>
              <Plus className="w-4 h-4 mr-2" />
              Add Day
            </Button>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Trip...' : 'Create Trip'}
          </Button>
          <Link href="/trips">
            <Button type="button" variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}