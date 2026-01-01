// API Configuration
export const API_CONFIG = {
  WEATHER_API_KEY: 'facbc64bcbe69bca607332a1b1e51a40',
  WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  
  TMDB_API_KEY: '3c8bc9b131ddd91115f6fbba4a2487aa',
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
};

// App Variant Configuration
export const getAppVariant = () => {
  const variant = process.env.APP_VARIANT || 'green';
  return variant as 'green' | 'orange';
};

export const APP_VARIANTS = {
  green: {
    name: 'WeatherMovies Green',
    bundleId: 'com.company.weathermovies.green',
    primaryColor: '#10B981',
    scheme: 'weathermovies-green',
  },
  orange: {
    name: 'WeatherMovies Orange',
    bundleId: 'com.company.weathermovies.orange',
    primaryColor: '#F97316',
    scheme: 'weathermovies-orange',
  },
};
