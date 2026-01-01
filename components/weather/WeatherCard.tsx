import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { WeatherData, weatherService } from '@/services/weatherService';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const [isCelsius, setIsCelsius] = useState(true);

  const temperature = isCelsius
    ? Math.round(weather.main.temp)
    : Math.round((weather.main.temp * 9) / 5 + 32);

  const feelsLike = isCelsius
    ? Math.round(weather.main.feels_like)
    : Math.round((weather.main.feels_like * 9) / 5 + 32);

  return (
    <Card className="mb-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-2xl font-bold text-gray-800">
            {weather.name}, {weather.sys.country}
          </Text>
          <Text className="text-gray-600 mt-1 capitalize">
            {weather.weather[0].description}
          </Text>
        </View>
        {weather.weather[0].icon && (
          <Image
            source={{ uri: weatherService.getWeatherIcon(weather.weather[0].icon) }}
            className="w-20 h-20"
            resizeMode="contain"
          />
        )}
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <View>
          <TouchableOpacity
            onPress={() => setIsCelsius(!isCelsius)}
            activeOpacity={0.7}
          >
            <Text className="text-5xl font-bold text-gray-800">
              {temperature}°{isCelsius ? 'C' : 'F'}
            </Text>
          </TouchableOpacity>
          <Text className="text-gray-600 mt-1">
            Feels like {feelsLike}°{isCelsius ? 'C' : 'F'}
          </Text>
        </View>

        <View className="items-end">
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-600">Humidity: </Text>
            <Text className="font-semibold">{weather.main.humidity}%</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-600">Wind: </Text>
            <Text className="font-semibold">{weather.wind.speed} m/s</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setIsCelsius(!isCelsius)}
        className="mt-4 py-2 bg-gray-100 rounded-lg items-center"
      >
        <Text className="text-gray-700 text-sm">
          Tap to switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
        </Text>
      </TouchableOpacity>
    </Card>
  );
}
