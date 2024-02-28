import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TVData } from "../../models/TVResponseModel";

type TVSliceType = {
  isLoaded: boolean;
  tvList: TVData[];
};

const initialState: TVSliceType = {
  isLoaded: false,
  tvList: [],
};

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    setTVList: (state, action: PayloadAction<TVData[]>) => {
      state.isLoaded = true;
      state.tvList = action.payload;
    },
  },
});

export const { setTVList } = tvSlice.actions;

export const selectIsTVLoaded = (state: RootState) => state.tv.isLoaded;
export const selectTVList = (state: RootState) => state.tv.tvList;

export default tvSlice.reducer;
