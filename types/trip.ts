export interface TravelMode {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'car' | 'walk';
  from: string;
  to: string;
  duration: string;
  cost?: number;
}

export interface DayItinerary {
  id: string;
  date: string;
  location: string;
  activities: string[];
  travelModes: TravelMode[];
  accommodation?: string;
}

export interface Trip {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  destinations: string[];
  days: DayItinerary[];
  totalCost?: number;
  status: 'planned' | 'ongoing' | 'completed';
  imageUrl?: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast: {
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }[];
}