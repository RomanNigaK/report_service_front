import { RootState } from "redux/store";

export const getUser = (state: RootState) => state.user;
export const getAuth = (state: RootState) => getUser(state).authData;
export const getAccessToken = (state: RootState) => getAuth(state)?.accessToken;

export const getFetchStatus = (state: RootState) => getUser(state).status;

export const getIsAdmin = (state: RootState) =>
  getUser(state).roles.includes("ROLE_ADMIN");

export const isAuthorized = (state: RootState) => getAuth(state) !== null;
