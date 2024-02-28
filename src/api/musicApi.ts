import { MusicResponseModel } from "../models/MusicResponseModel";

const LAST_FM_BASE_URL = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${import.meta.env.VITE_LAST_FM_API_KEY}&format=json&limit=20`;

export const getTrendingMusic = async (): Promise<MusicResponseModel> => {
  const response = await fetch(LAST_FM_BASE_URL);
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
