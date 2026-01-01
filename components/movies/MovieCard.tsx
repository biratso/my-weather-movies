import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Movie, movieService, MOVIE_GENRES } from '@/services/movieService';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export function MovieCard({ movie, onPress }: MovieCardProps) {
  const imageUrl = movieService.getImageUrl(movie.poster_path);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average.toFixed(1);
  
  // Get first 2 genres
  const genres = movie.genre_ids
    .slice(0, 2)
    .map(id => MOVIE_GENRES[id])
    .filter(Boolean);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-white rounded-xl shadow-sm overflow-hidden m-2 flex-1"
      style={{ minWidth: 160, maxWidth: 200 }}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-60"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-60 bg-gray-300 items-center justify-center">
          <Ionicons name="film-outline" size={48} color="#9CA3AF" />
        </View>
      )}

      <View className="p-3">
        <Text
          className="font-semibold text-base text-gray-800"
          numberOfLines={2}
        >
          {movie.title}
        </Text>

        <View className="flex-row items-center mt-2 mb-1">
          <Ionicons name="calendar-outline" size={14} color="#6B7280" />
          <Text className="text-gray-600 text-sm ml-1">{year}</Text>
          <View className="flex-row items-center ml-3">
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text className="text-gray-600 text-sm ml-1">{rating}</Text>
          </View>
        </View>

        {genres.length > 0 && (
          <View className="flex-row flex-wrap mt-1">
            {genres.map((genre, index) => (
              <View
                key={index}
                className="bg-gray-100 rounded-full px-2 py-1 mr-1 mb-1"
              >
                <Text className="text-xs text-gray-600">{genre}</Text>
              </View>
            ))}
          </View>
        )}

        {movie.overview && (
          <Text
            className="text-gray-500 text-xs mt-2"
            numberOfLines={3}
          >
            {movie.overview}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
