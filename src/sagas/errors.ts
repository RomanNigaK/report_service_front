/* eslint-disable no-unsafe-optional-chaining */
import { AxiosError } from "axios";
import { put } from "redux-saga/effects";
import { nanoid } from "@reduxjs/toolkit";

import { addMessage, setErrorFields } from "redux/slices/errors/actions";
import { errorHandler } from "constans/errors";

export function* handleError(e: unknown) {
  if (e instanceof AxiosError) {
    const { fields, message, detail } = e?.response?.data;

    const translatedError = errorHandler(message || detail || e);

    yield put(
      addMessage({
        id: nanoid(),
        message: `${translatedError}`,
      })
    );
  } else {
    yield put(
      addMessage({
        id: nanoid(),
        message: `${e}`,
      })
    );
  }
}
