const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(location: string) {
  try {
    // In production, use real API key
    if (OPENWEATHER_API_KEY === 'demo_key') {
      // Return mock data for demo
      return getMockWeatherData(location);
    }

    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(location)}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Weather data not available');
    }

    const data = await response.json();
    
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      forecast: [] // Would fetch from forecast endpoint
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return getMockWeatherData(location);
  }
}

function getMockWeatherData(location: string) {
  const mockData = {
    'Paris': { temp: 18, condition: 'partly cloudy', icon: '02d' },
    'Amsterdam': { temp: 15, condition: 'rainy', icon: '10d' },
    'Berlin': { temp: 16, condition: 'cloudy', icon: '04d' },
    'Prague': { temp: 14, condition: 'sunny', icon: '01d' },
    'Tokyo': { temp: 22, condition: 'sunny', icon: '01d' },
    'Kyoto': { temp: 20, condition: 'partly cloudy', icon: '02d' },
    'Reykjavik': { temp: 8, condition: 'windy', icon: '50d' },
  };

  const cityData = mockData[location as keyof typeof mockData] || 
    { temp: 20, condition: 'sunny', icon: '01d' };

  return {
    location,
    temperature: cityData.temp,
    condition: cityData.condition,
    icon: cityData.icon,
    humidity: 65,
    windSpeed: 3.2,
    forecast: [
      { date: '2024-12-21', high: cityData.temp + 2, low: cityData.temp - 5, condition: cityData.condition, icon: cityData.icon },
      { date: '2024-12-22', high: cityData.temp + 1, low: cityData.temp - 4, condition: 'sunny', icon: '01d' },
      { date: '2024-12-23', high: cityData.temp + 3, low: cityData.temp - 3, condition: 'cloudy', icon: '04d' },
    ]
  };
}