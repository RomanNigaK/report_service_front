import { takeEvery, call, put, delay } from "redux-saga/effects";
import {
  fetchPfofileAction,
  fetchPfofileActionSeccess,
  setStatus,
} from "redux/slices/profile/actions";
import { getProfile } from "./api/profile";
import { handleError } from "./errors";

const fetchPfofileActionHandler = function* () {
  try {
    yield put(setStatus());
    const { data } = yield call(getProfile);

    yield put(fetchPfofileActionSeccess(data));
  } catch (e) {
    yield call(handleError, e);
  }
};

export default function* root() {
  yield takeEvery(fetchPfofileAction, fetchPfofileActionHandler);
}
