import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TracksData } from "../../models/MusicResponseModel";

type MusicSliceType = {
  isLoaded: boolean;
  musicList: TracksData[];
};

const initialState: MusicSliceType = {
  isLoaded: false,
  musicList: [],
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setMusicList: (state, action: PayloadAction<TracksData[]>) => {
      state.isLoaded = true;
      state.musicList = action.payload;
    },
  },
});

export const { setMusicList } = musicSlice.actions;

export const selectIsMusicLoaded = (state: RootState) => state.music.isLoaded;
export const selectMusicList = (state: RootState) => state.music.musicList;

export default musicSlice.reducer;
