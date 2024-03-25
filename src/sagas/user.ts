import { all, call, put, takeLatest, SagaReturnType } from "redux-saga/effects";
import { Saga } from "sagas/types";
import { handleError } from "sagas/errors";
import {
  setStatus,
  signInRequest,
  SignInRequestAction,
  signInSuccess,
  signOutRequest,
  signOutSuccess,
  signUpRequest,
  SignUpRequestAction,
  signUpSuccess,
} from "redux/slices/user/actions";
import { login, logout, register } from "./api/auth";
import { fetchPfofileAction } from "redux/slices/profile/actions";
import { axiosInstanceUpdateToken } from "utils/axios";
import { FetchStatus } from "redux/types";

const signInRequestHandler: Saga<SignInRequestAction> = function* ({
  payload,
}) {
  const { email, password } = payload;
  yield put(setStatus(FetchStatus.Fetching));
  try {
    const response: SagaReturnType<typeof login> = yield call(login, {
      email,
      password,
    });
    const { token: accessToken } = response;
    yield put(setStatus(FetchStatus.Fetched));
    yield put(
      signInSuccess({
        data: {
          accessToken,
        },
      })
    );

    axiosInstanceUpdateToken(accessToken);

    yield put(fetchPfofileAction());
  } catch (e) {
    yield put(setStatus(FetchStatus.Error));
    yield call(handleError, e);
  }
};

const signUpRequestHandler: Saga<SignUpRequestAction> = function* ({
  payload,
}) {
  const { data } = payload;

  try {
    yield put(setStatus(FetchStatus.Fetching));
    yield call(register, data);
    yield put(setStatus(FetchStatus.Fetched));
    yield put(signInRequest({ email: data.email, password: data.password }));
  } catch (e) {
    yield call(handleError, e);
  }
};

const signOutRequestHandler: Saga = function* () {
  try {
    yield call(logout);
    yield put(signOutSuccess());
  } catch (e) {
    yield call(handleError, e);
  }
};

export default function* root() {
  yield all([
    takeLatest(signInRequest, signInRequestHandler),
    takeLatest(signUpRequest, signUpRequestHandler),
    takeLatest(signOutRequest, signOutRequestHandler),
  ]);
}
