import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MovieData } from "../../models/MovieResponseModel";

type MovieSliceType = {
  isLoaded: boolean;
  movieList: MovieData[];
};

const initialState: MovieSliceType = {
  isLoaded: false,
  movieList: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieList: (state, action: PayloadAction<MovieData[]>) => {
      state.isLoaded = true;
      state.movieList = action.payload;
    },
  },
});

export const { setMovieList } = movieSlice.actions;

export const selectIsMoviesLoaded = (state: RootState) => state.movie.isLoaded;
export const selectMovieList = (state: RootState) => state.movie.movieList;

export default movieSlice.reducer;
