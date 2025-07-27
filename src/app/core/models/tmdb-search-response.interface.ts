import { TMDbMovieResult } from './tmdb-movie-result.interface';

export interface TMDbSearchResponse {
  page: number;
  results: TMDbMovieResult[];
  total_pages: number;
  total_results: number;
}
