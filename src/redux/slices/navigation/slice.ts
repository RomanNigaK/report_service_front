import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pages } from "constans/enums";

export type Page = keyof typeof Pages;

interface NavigationState {
  page?: Page;
}

const initialState: NavigationState = {};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<Page>) => {
      state.page = action.payload;
    },
  },
});
export default navigationSlice.reducer;
