import GenreModel from "./GenreModel";

export type TVData = {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  genre_list: GenreModel[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

export interface TVResponseModel {
  page: number;
  results: TVData[];
  total_pages: number;
  total_results: number;
}
