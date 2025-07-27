export interface TMDbMovieResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  budget: number;
  revenue: number;
  vote_count: number;
  spoken_languages: { english_name: string }[];
}
