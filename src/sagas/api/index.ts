/* eslint-disable require-yield */
import { call, SagaReturnType } from "redux-saga/effects";
import { axiosInstance, RawAxiosRequestConfig } from "utils/axios";


function* prepareConfig(query?: Record<string, string | number>) {
  return  {
    headers: {},
    params: query,
    withCredentials: true,
  } as RawAxiosRequestConfig;
}

export function* postRequest(url: string, params?: unknown) {
  const config: SagaReturnType<typeof prepareConfig> = yield call(
    prepareConfig
  );
  const { data, status } = yield axiosInstance.post(url, params, config);

  return { data, status };
}

export function* postRequestWithoutAuthorization(url: string, params?: unknown) {
  const { data, status } = yield axiosInstance.post(url, params);

  return { data, status };
}

export function* getRequest(
  url: string,
  query?: Record<string, string | number>
) {
  const config: SagaReturnType<typeof prepareConfig> = yield call(
    prepareConfig,
    query
  );
  const { data, status } = yield axiosInstance.get(url, config);

  return { data, status };
}

export function* deleteRequest(url: string) {
  const config: SagaReturnType<typeof prepareConfig> = yield call(
    prepareConfig
  );
  const { data, status } = yield axiosInstance.delete(url, config);

  return { data, status };
}

export function* putRequest(url: string, params?: unknown) {
  const config: SagaReturnType<typeof prepareConfig> = yield call(
    prepareConfig
  );
  const { data, status } = yield axiosInstance.put(url, params, config);

  return { data, status };
}

export function* patchRequest(url: string, params?: unknown) {
  const config: SagaReturnType<typeof prepareConfig> = yield call(
    prepareConfig
  );
  const { data, status } = yield axiosInstance.patch(url, params, config);

  return { data, status };
}
