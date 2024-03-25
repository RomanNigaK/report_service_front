import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "redux/types";

export type Profile = {
  id: string;
  sername: string;
  name: string;
  patronymic: string;
  email: string;
  phone: number;
};

interface IState {
  profile?: Profile;
  status: FetchStatus;
}

const initialState: IState = {
  status: FetchStatus.NotFetched,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setStatus: (state) => {
      state.status = FetchStatus.Fetching;
    },
    fetchPfofileActionSeccess: (state, actions: PayloadAction<Profile>) => {
      state.profile = actions.payload;
      state.status = FetchStatus.Fetched;
    },
  },
});
export default profileSlice.reducer;
