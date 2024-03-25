import { NoticeTypes } from "constans/enums";
import { errorsSlice } from "./slice";

export type AddErrorMessageAction = {
  id: string;
  message: string;
  type?: NoticeTypes;
};

export type RemoveErrorMessageAction = {
  id: string;
};

export type SetErrorFieldsAction = {
  fields: Record<string, string>;
};

export type ResetErrorFieldsAction = void;

export const {
  addMessage,
  removeMessage,
  setErrorFields,
  resetErrorFields,
} = errorsSlice.actions;
