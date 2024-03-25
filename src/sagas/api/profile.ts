/* eslint-disable require-yield */
import { getRequest, patchRequest } from ".";
import { call } from "redux-saga/effects";
import { ENDPOINTS } from "config/endpoints";
import { Profile } from "redux/slices/profile/slice";

export function* getProfile() {
  const { data } = yield call(getRequest, ENDPOINTS.AUTH.AUTH);

  return data as Profile;
}
