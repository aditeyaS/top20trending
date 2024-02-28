import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  selectIsTVLoaded,
  selectTVList,
  setTVList,
} from "../redux/slice/tvSlice";
import { getTrendingTV } from "../api/tvApi";
import { TVData } from "../models/TVResponseModel";
import getTVGenresList from "../utils/TMDBTVGenres";
import { setIsLoading, showToast } from "../redux/slice/appSlice";

const TVPage = () => {
  const dispatch = useAppDispatch();
  const isTVLoaded = useAppSelector(selectIsTVLoaded);
  const tvList = useAppSelector(selectTVList);

  useEffect(() => {
    const loadTV = async () => {
      dispatch(setIsLoading(true));
      try {
        const result = await getTrendingTV();
        const updatedList: TVData[] = result.results.map((result) => ({
          ...result,
          genre_list: getTVGenresList(result.genre_ids),
        }));
        dispatch(setTVList(updatedList));
        dispatch(setIsLoading(false));
        dispatch(
          showToast({
            message: "TV Series loaded successfully.",
            type: "SUCCESS",
          }),
        );
      } catch (error) {
        dispatch(setIsLoading(false));
        dispatch(
          showToast({ message: "Error loading TV Series.", type: "ERROR" }),
        );
      }
    };
    if (!isTVLoaded) loadTV();
  }, [isTVLoaded, dispatch]);

  return (
    <>
      {tvList.map((tv, index) => (
        <a
          href={`https://www.themoviedb.org/tv/${tv.id}`}
          target="_blank"
          className="cursor-pointer card w-2/5 bg-base-100 shadow-xl p-5"
          key={index}
        >
          <div className="flex flex-row">
            <div className="mr-2">
              <img
                className="w-48 h-full"
                src={`http://image.tmdb.org/t/p/w185${tv.poster_path}`}
                alt="Shoes"
              />
            </div>
            <div>
              <span className="text-base line-clamp-1">{`(${tv.vote_average.toFixed(1)}) ${tv.name}`}</span>
              <span className="line-clamp-2 text-sm">{tv.overview}</span>
              <div className="card-actions">
                <div className="flex gap-1 flex-wrap">
                  {tv.genre_list.map((genre, idx) => (
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

export default TVPage;
