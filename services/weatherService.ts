import axios from 'axios';
import { API_CONFIG } from '@/config/env';

export interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

const weatherApi = axios.create({
  baseURL: API_CONFIG.WEATHER_BASE_URL,
  params: {
    appid: API_CONFIG.WEATHER_API_KEY,
    units: 'metric',
  },
});

export const weatherService = {
  getWeatherByCity: async (city: string): Promise<WeatherData> => {
    const response = await weatherApi.get('/weather', {
      params: { q: city },
    });
    return response.data;
  },

  getWeatherIcon: (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  },
};
