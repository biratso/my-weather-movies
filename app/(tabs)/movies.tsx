import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { movieService, Movie, MovieDetails } from '@/services/movieService';
import { MovieCard } from '@/components/movies/MovieCard';
import { MovieSkeleton } from '@/components/ui/Skeleton';

export default function MoviesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['movies', debouncedQuery, page],
    queryFn: () =>
      debouncedQuery
        ? movieService.searchMovies(debouncedQuery, page)
        : movieService.getPopularMovies(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: movieDetails } = useQuery({
    queryKey: ['movie', selectedMovie],
    queryFn: () => movieService.getMovieDetails(selectedMovie!),
    enabled: selectedMovie !== null,
  });

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadMore = useCallback(() => {
    if (data && page < data.total_pages) {
      setPage(prev => prev + 1);
    }
  }, [data, page]);

  const renderMovieDetails = () => {
    if (!movieDetails) return null;

    const imageUrl = movieService.getImageUrl(movieDetails.backdrop_path, 'original');
    const year = movieDetails.release_date
      ? new Date(movieDetails.release_date).getFullYear()
      : 'N/A';

    return (
      <Modal
        visible={selectedMovie !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedMovie(null)}
      >
        <View className="flex-1 bg-white">
          <View className="bg-white px-4 py-3 shadow-sm flex-row items-center">
            <TouchableOpacity
              onPress={() => setSelectedMovie(null)}
              className="mr-3"
            >
              <Ionicons name="close" size={28} color="#374151" />
            </TouchableOpacity>
            <Text className="text-xl font-bold flex-1" numberOfLines={1}>
              Movie Details
            </Text>
          </View>

          <ScrollView className="flex-1">
            {imageUrl && (
              <Image
                source={{ uri: imageUrl }}
                className="w-full h-64"
                resizeMode="cover"
              />
            )}

            <View className="p-4">
              <Text className="text-3xl font-bold text-gray-800 mb-2">
                {movieDetails.title}
              </Text>

              <View className="flex-row items-center mb-4">
                <View className="flex-row items-center mr-4">
                  <Ionicons name="calendar-outline" size={18} color="#6B7280" />
                  <Text className="text-gray-600 ml-1">{year}</Text>
                </View>
                <View className="flex-row items-center mr-4">
                  <Ionicons name="star" size={18} color="#F59E0B" />
                  <Text className="text-gray-600 ml-1">
                    {movieDetails.vote_average.toFixed(1)}
                  </Text>
                </View>
                {movieDetails.runtime > 0 && (
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={18} color="#6B7280" />
                    <Text className="text-gray-600 ml-1">
                      {movieDetails.runtime} min
                    </Text>
                  </View>
                )}
              </View>

              {movieDetails.genres.length > 0 && (
                <View className="flex-row flex-wrap mb-4">
                  {movieDetails.genres.map(genre => (
                    <View
                      key={genre.id}
                      className="bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2"
                    >
                      <Text className="text-gray-700">{genre.name}</Text>
                    </View>
                  ))}
                </View>
              )}

              <Text className="text-base font-semibold text-gray-800 mb-2">
                Overview
              </Text>
              <Text className="text-gray-600 leading-6">
                {movieDetails.overview || 'No overview available.'}
              </Text>

              <View className="bg-gray-50 rounded-xl p-4 mt-4">
                <Text className="text-gray-700">
                  Status: <Text className="font-semibold">{movieDetails.status}</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-3 shadow-sm">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search movies..."
            className="flex-1 ml-2 text-base"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4]}
          numColumns={2}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <MovieSkeleton />}
          contentContainerClassName="p-2"
        />
      ) : error ? (
        <View className="flex-1 items-center justify-center p-6">
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text className="text-red-600 text-center mt-4 text-lg font-semibold">
            Failed to load movies
          </Text>
          <Text className="text-red-500 text-center mt-2">
            Please check your connection and try again
          </Text>
          <TouchableOpacity
            onPress={() => refetch()}
            className="mt-4 bg-red-600 rounded-lg px-6 py-3"
          >
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : data?.results.length === 0 ? (
        <View className="flex-1 items-center justify-center p-6">
          <Ionicons name="film-outline" size={64} color="#9CA3AF" />
          <Text className="text-gray-600 text-center mt-4 text-lg">
            No movies found
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            Try searching for something else
          </Text>
        </View>
      ) : (
        <FlatList
          data={data?.results || []}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={() => setSelectedMovie(item.id)} />
          )}
          contentContainerClassName="p-2"
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            page < (data?.total_pages || 0) ? (
              <View className="py-4">
                <Text className="text-center text-gray-500">Loading more...</Text>
              </View>
            ) : null
          }
        />
      )}

      {renderMovieDetails()}
    </View>
  );
}
