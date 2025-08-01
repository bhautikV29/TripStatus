import { Plane, Train, Bus, Car, MapPin } from 'lucide-react';
import { TravelMode } from '@/types/trip';

interface TravelModeIconProps {
  mode: TravelMode['type'];
  className?: string;
}

export function TravelModeIcon({ mode, className = "w-4 h-4" }: TravelModeIconProps) {
  switch (mode) {
    case 'flight':
      return <Plane className={className} />;
    case 'train':
      return <Train className={className} />;
    case 'bus':
      return <Bus className={className} />;
    case 'car':
      return <Car className={className} />;
    case 'walk':
      return <MapPin className={className} />;
    default:
      return <MapPin className={className} />;
  }
}