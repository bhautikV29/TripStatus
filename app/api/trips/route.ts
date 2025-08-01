import { NextRequest, NextResponse } from 'next/server';
import { TripService } from '@/lib/trip-service';
import { Trip } from '@/types/trip';

export async function GET() {
  try {
    const allTrips = TripService.getAllTrips();
    return NextResponse.json(allTrips);
  } catch (error) {
    console.error('Trips API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trips' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const tripData: Trip = await request.json();
    
    // Validate required fields
    if (!tripData.title || !tripData.startDate || !tripData.endDate) {
      return NextResponse.json(
        { error: 'Missing required fields: title, startDate, endDate' },
        { status: 400 }
      );
    }

    const newTrip = TripService.createTrip(tripData);
    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    console.error('Create trip API error:', error);
    return NextResponse.json(
      { error: 'Failed to create trip' },
      { status: 500 }
    );
  }
}