import { Trip } from '@/types/trip';

export const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'European Adventure',
    description: 'A two-week journey through the heart of Europe',
    startDate: '2024-06-15',
    endDate: '2024-06-29',
    destinations: ['Paris', 'Amsterdam', 'Berlin', 'Prague'],
    totalCost: 2800,
    status: 'planned',
    imageUrl: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
    days: [
      {
        id: '1-1',
        date: '2024-06-15',
        location: 'Paris',
        activities: ['Visit Eiffel Tower', 'Louvre Museum', 'Seine River Cruise'],
        travelModes: [
          {
            id: '1-1-1',
            type: 'flight',
            from: 'New York',
            to: 'Paris',
            duration: '7h 30m',
            cost: 650
          }
        ],
        accommodation: 'Hotel Le Meurice'
      },
      {
        id: '1-2',
        date: '2024-06-17',
        location: 'Amsterdam',
        activities: ['Canal Tour', 'Van Gogh Museum', 'Red Light District'],
        travelModes: [
          {
            id: '1-2-1',
            type: 'train',
            from: 'Paris',
            to: 'Amsterdam',
            duration: '3h 20m',
            cost: 85
          }
        ],
        accommodation: 'Lloyd Hotel'
      }
    ]
  },
  {
    id: '2',
    title: 'Japanese Discovery',
    description: 'Explore the culture and beauty of Japan',
    startDate: '2024-04-01',
    endDate: '2024-04-14',
    destinations: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'],
    totalCost: 3200,
    status: 'completed',
    imageUrl: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-161401.jpeg?auto=compress&cs=tinysrgb&w=800',
    days: [
      {
        id: '2-1',
        date: '2024-04-01',
        location: 'Tokyo',
        activities: ['Senso-ji Temple', 'Shibuya Crossing', 'Tokyo Skytree'],
        travelModes: [
          {
            id: '2-1-1',
            type: 'flight',
            from: 'San Francisco',
            to: 'Tokyo',
            duration: '11h 45m',
            cost: 1200
          }
        ],
        accommodation: 'Park Hyatt Tokyo'
      }
    ]
  },
  {
    id: '3',
    title: 'Iceland Adventure',
    description: 'Experience the natural wonders of Iceland',
    startDate: '2024-08-10',
    endDate: '2024-08-17',
    destinations: ['Reykjavik', 'Golden Circle', 'Blue Lagoon'],
    totalCost: 2100,
    status: 'ongoing',
    imageUrl: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800',
    days: [
      {
        id: '3-1',
        date: '2024-08-10',
        location: 'Reykjavik',
        activities: ['Hallgrimskirkja Church', 'Harpa Concert Hall', 'Old Harbor'],
        travelModes: [
          {
            id: '3-1-1',
            type: 'flight',
            from: 'Boston',
            to: 'Reykjavik',
            duration: '5h 15m',
            cost: 420
          }
        ],
        accommodation: 'Hotel Borg'
      }
    ]
  }
];