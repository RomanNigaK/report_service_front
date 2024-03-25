import { createAction } from "@reduxjs/toolkit";
import { AuthData, userSlice } from "./slice";

export type SignInRequestAction = {
  email: string;
  password: string;
};

export type SignInSuccessAction = {
  data: AuthData;
};

export type RegisterData = {
  name: string;
  sername: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type SignUpRequestAction = {
  data: RegisterData;
};

export type SignUpSuccessAction = {
  data: AuthData;
};


export const signInRequest = createAction<SignInRequestAction>(
  "user/signInRequest"
);
export const signOutRequest = createAction("user/signOutRequest");
export const signOutSuccess = createAction("user/signOutSuccess");

export const signUpRequest = createAction<SignUpRequestAction>(
  "user/signUpRequest"
);



export const {
  signInSuccess,
  signUpSuccess,
  setStatus,
} = userSlice.actions;
