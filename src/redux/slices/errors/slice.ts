import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signOutSuccess } from "../user/actions";
import {
  ResetErrorFieldsAction,
  AddErrorMessageAction,
  RemoveErrorMessageAction,
  SetErrorFieldsAction,
} from "./actions";
import { NoticeTypes } from "constans/enums";

type MessageId = string;

type Message = {
  id: MessageId;
  message: string;
  type?: NoticeTypes;
};

type Fields = Record<string, string>;

export type ErrorsState = {
  messages: Message[];
  fields: Fields;
};

const initialState: ErrorsState = {
  messages: [],
  fields: {},
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    addMessage: (state, { payload }: PayloadAction<AddErrorMessageAction>) => {
      const { id, message, type } = payload;

      state.messages.push({ id, message, type });
    },
    removeMessage: (
      state,
      { payload }: PayloadAction<RemoveErrorMessageAction>
    ) => {
      const { id } = payload;

      state.messages = state.messages.filter((message) => message.id !== id);
    },
    setErrorFields: (
      state,
      { payload }: PayloadAction<SetErrorFieldsAction>
    ) => {
      const { fields } = payload;

      state.fields = fields || {};
    },
    resetErrorFields: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { payload }: PayloadAction<ResetErrorFieldsAction>
    ) => {
      state.fields = {};
    },
  },
});

export default errorsSlice.reducer;
