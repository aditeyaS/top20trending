import { TVResponseModel } from "../models/TVResponseModel";

const TMDB_BASE_URL =
  "https://api.themoviedb.org/3/trending/tv/week?language=en-US";

export const getTrendingTV = async (): Promise<TVResponseModel> => {
  const response = await fetch(TMDB_BASE_URL, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
