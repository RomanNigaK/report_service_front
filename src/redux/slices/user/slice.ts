import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SignInSuccessAction,
  SignUpSuccessAction,
} from "redux/slices/user/actions";
import { FetchStatus } from "redux/types";
import { parseJwt } from "utils/jwt";

export type UserId = string;

export type AuthData = {
  accessToken: string;
};

export type UserState = {
  authData: AuthData | null;
  isAuth: boolean;
  status: FetchStatus;
  roles: string[];
};

const initialState: UserState = {
  authData: null,
  isAuth: false,
  roles: [],
  status: FetchStatus.NotFetched,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.status = action.payload;
    },
    signInSuccess: (state, action: PayloadAction<SignInSuccessAction>) => {
      const { data } = action.payload;
      state.isAuth = true;
      state.authData = data;
      state.roles = parseJwt(action.payload.data.accessToken).roles;
    },
    signUpSuccess: (state, action: PayloadAction<SignUpSuccessAction>) => {
      const { data } = action.payload;

      state.authData = data;
    },
  },
});

export default userSlice.reducer;
