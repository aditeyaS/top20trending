import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import ToastModel from "../../models/ToastModel";

type AppSliceType = {
  isLoading: boolean;
  showToast: boolean;
  toastData: ToastModel | null;
  selectedTab: "Movies" | "TV" | "Music";
};

const initialState: AppSliceType = {
  isLoading: false,
  showToast: false,
  toastData: null,
  selectedTab: "Movies",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action: PayloadAction<ToastModel>) => {
      state.showToast = true;
      state.toastData = action.payload;
    },
    hideToast: (state) => {
      state.showToast = false;
      state.toastData = null;
    },
    changeTab: (state, action: PayloadAction<"Movies" | "TV" | "Music">) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setIsLoading, showToast, hideToast, changeTab } =
  appSlice.actions;

export const selectIsLoading = (state: RootState) => state.app.isLoading;
export const selectShowToast = (state: RootState) => state.app.showToast;
export const selectToastData = (state: RootState) => state.app.toastData;
export const selectSelectedTab = (state: RootState) => state.app.selectedTab;

export default appSlice.reducer;
