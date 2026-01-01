import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { weatherService } from '@/services/weatherService';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { WeatherSkeleton } from '@/components/ui/Skeleton';
import { useAuth } from '@/context/AuthContext';

const DEFAULT_CITY = 'London';

export default function WeatherScreen() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [searchInput, setSearchInput] = useState('');
  const { logout } = useAuth();

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => weatherService.getWeatherByCity(city),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleSearch = () => {
    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-3 shadow-sm">
        <View className="flex-row items-center">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
            <Ionicons name="search-outline" size={20} color="#9CA3AF" />
            <TextInput
              value={searchInput}
              onChangeText={setSearchInput}
              placeholder="Search city..."
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              className="flex-1 ml-2 text-base"
            />
          </View>
          <TouchableOpacity
            onPress={handleSearch}
            className="ml-2 bg-blue-600 rounded-lg p-2"
          >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        contentContainerClassName="p-4"
      >
        {isLoading ? (
          <WeatherSkeleton />
        ) : error ? (
          <View className="bg-red-50 rounded-xl p-6 items-center">
            <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
            <Text className="text-red-600 text-center mt-4 text-lg font-semibold">
              City not found
            </Text>
            <Text className="text-red-500 text-center mt-2">
              Please try searching for another city
            </Text>
            <TouchableOpacity
              onPress={() => {
                setCity(DEFAULT_CITY);
                setSearchInput('');
              }}
              className="mt-4 bg-red-600 rounded-lg px-6 py-3"
            >
              <Text className="text-white font-semibold">
                Back to {DEFAULT_CITY}
              </Text>
            </TouchableOpacity>
          </View>
        ) : data ? (
          <>
            <WeatherCard weather={data} />
            
            <View className="bg-blue-50 rounded-xl p-4 mt-4">
              <Text className="text-blue-800 text-sm">
                💡 Tip: Pull down to refresh weather data
              </Text>
            </View>
          </>
        ) : null}

        <TouchableOpacity
          onPress={handleLogout}
          className="mt-6 bg-red-100 rounded-lg p-4 flex-row items-center justify-center"
        >
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text className="text-red-600 font-semibold ml-2">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
