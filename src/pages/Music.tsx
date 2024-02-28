import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  selectIsMusicLoaded,
  selectMusicList,
  setMusicList,
} from "../redux/slice/musicSlice";
import { getTrendingMusic } from "../api/musicApi";
import { setIsLoading, showToast } from "../redux/slice/appSlice";

const Music = () => {
  const dispatch = useAppDispatch();
  const isMusicLoaded = useAppSelector(selectIsMusicLoaded);
  const musicList = useAppSelector(selectMusicList);

  useEffect(() => {
    const loadMusic = async () => {
      dispatch(setIsLoading(true));
      try {
        const result = await getTrendingMusic();
        dispatch(setMusicList(result.tracks.track));
        dispatch(setIsLoading(false));
        dispatch(
          showToast({ message: "Music loaded successfully.", type: "SUCCESS" }),
        );
      } catch (error) {
        dispatch(setIsLoading(false));
        dispatch(showToast({ message: "Error loading music.", type: "ERROR" }));
      }
    };
    if (!isMusicLoaded) loadMusic();
  }, [isMusicLoaded, dispatch]);

  return (
    <>
      {musicList.map((music, index) => (
        <a
          href={music.url}
          target="_blank"
          className="cursor-pointer card w-2/5 bg-base-100 shadow-xl p-5"
          key={index}
        >
          <div className="flex flex-row">
            <div className="mr-2">
              <img
                className="w-24 h-full"
                src={music.image[music.image.length - 1]["#text"]}
                alt={music.name}
              />
            </div>
            <div>
              <span className="text-base line-clamp-1">{music.name}</span>
              <span className="line-clamp-2 text-sm">{music.artist.name}</span>
              <div className="mt-2 text-xs flex gap-1 content-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-accent"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"
                    stroke-width="2"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                {music.playcount} plays
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
};

export default Music;
