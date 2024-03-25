import { RootState } from "redux/store";

export const getRootNavigation = (state: RootState) => state.navigation;

export const getCurrentPage = (state: RootState) => getRootNavigation(state).page

