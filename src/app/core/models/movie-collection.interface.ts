import { TMDbMovieResult } from './tmdb-movie-result.interface';

export interface MovieCollection {
  title: string;
  description: string;
  movies: TMDbMovieResult[];
}
