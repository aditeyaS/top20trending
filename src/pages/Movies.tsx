import { useEffect } from "react";
import { getTrendingMovies } from "../api/moviesApi";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  selectIsMoviesLoaded,
  selectMovieList,
  setMovieList,
} from "../redux/slice/movieSlice";
import getMovieGenresList from "../utils/TMDBMovieGenres";
import { MovieData } from "../models/MovieResponseModel";
import { setIsLoading, showToast } from "../redux/slice/appSlice";

const Movies = () => {
  const dispatch = useAppDispatch();
  const isMoviesLoaded = useAppSelector(selectIsMoviesLoaded);
  const movieList = useAppSelector(selectMovieList);

  useEffect(() => {
    const loadMovies = async () => {
      dispatch(setIsLoading(true));
      try {
        const result = await getTrendingMovies();
        const updatedList: MovieData[] = result.results.map((result) => ({
          ...result,
          genre_list: getMovieGenresList(result.genre_ids),
        }));
        dispatch(setMovieList(updatedList));
        dispatch(setIsLoading(false));
        dispatch(
          showToast({
            message: "Movies loaded successfully.",
            type: "SUCCESS",
          }),
        );
      } catch (error) {
        dispatch(setIsLoading(false));
        dispatch(
          showToast({ message: "Error loading movies.", type: "ERROR" }),
        );
      }
    };
    if (!isMoviesLoaded) loadMovies();
  }, [isMoviesLoaded, dispatch]);

  return (
    <>
      {movieList.map((movie, index) => (
        <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          className="cursor-pointer card w-2/5 bg-base-100 shadow-xl p-5"
          key={index}
        >
          <div className="flex flex-row">
            <div className="mr-2">
              <img
                className="w-48 h-full"
                src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt="Shoes"
              />
            </div>
            <div>
              <span className="text-base line-clamp-1">{`(${movie.vote_average.toFixed(1)}) ${movie.title}`}</span>
              <span className="line-clamp-2 text-sm">{movie.overview}</span>
              <div className="card-actions">
                <div className="flex gap-1 flex-wrap">
                  {movie.genre_list.map((genre, idx) => (
                    <span className="badge text-xs badge-accent" key={idx}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
};

export default Movies;
