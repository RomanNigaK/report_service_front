import { RootState } from "redux/store";

export const getRootState = (state: RootState) => state.error;
// export const getErrorFields = (state: RootState) => getRootState(state).fields;
export const getErrorFields = (state: RootState) => getRootState(state).fields;
export const getErrorMessages = (state: RootState) =>
  getRootState(state).messages;
