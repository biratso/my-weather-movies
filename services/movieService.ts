import axios from 'axios';
import { API_CONFIG } from '@/config/env';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  status: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const movieApi = axios.create({
  baseURL: API_CONFIG.TMDB_BASE_URL,
  params: {
    api_key: API_CONFIG.TMDB_API_KEY,
  },
});

export const movieService = {
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await movieApi.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    const response = await movieApi.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await movieApi.get(`/movie/${movieId}`);
    return response.data;
  },

  getImageUrl: (path: string | null, size: 'w500' | 'original' = 'w500') => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },
};

// Genre mapping for quick reference
export const MOVIE_GENRES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};
