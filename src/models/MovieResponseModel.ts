import GenreModel from "./GenreModel";

export type MovieData = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  genre_list: GenreModel[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export interface MovieResponseModel {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}
