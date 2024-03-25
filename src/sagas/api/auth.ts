import { ENDPOINTS } from "config/endpoints";
import { call } from "redux-saga/effects";
import { getRequest, postRequestWithoutAuthorization } from "sagas/api";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
}
export interface RegisterRequest {
  name: string;
  sername: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export function* login(params: LoginRequest) {
  const { data } = yield call(
    postRequestWithoutAuthorization,
    ENDPOINTS.AUTH.LOGIN,
    params
  );

  return data as LoginResponse;
}

export function* register(params: RegisterRequest) {
  const { data } = yield call(
    postRequestWithoutAuthorization,
    ENDPOINTS.AUTH.REGISTER,
    params
  );

  return data as LoginResponse;
}

export function* logout() {
  yield call(getRequest, ENDPOINTS.AUTH.LOGOUT);
}
