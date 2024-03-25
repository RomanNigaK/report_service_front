import { takeEvery, call, put } from "redux-saga/effects";
import { handleError } from "./errors";
import {
  CreateEmployeeData,
  fetchCreateEmployeeRequest,
  fetchCreateEmployeeRequestError,
  fetchCreateEmployeeRequestSuccess,
  fetchEmployeesAction,
  fetchEmployeesActionSeccess,
  setStatus,
} from "redux/slices/employee/actions";
import { createEmploye, getEmployees } from "./api/employee";
import { FetchStatus } from "redux/types";
import { Saga } from "./types";

const fetchEmployeeActionHandler = function* () {
  try {
    yield put(setStatus(FetchStatus.Fetching));
    const { data } = yield call(getEmployees);

    yield put(fetchEmployeesActionSeccess(data));
  } catch (e) {
    yield call(handleError, e);
  }
};

const fetchCreateEmployeeRequestHandler: Saga<CreateEmployeeData> = function* ({
  payload,
}) {
  try {
    const { data } = yield call(createEmploye, payload);

    yield put(
      fetchCreateEmployeeRequestSuccess({
        createdId: payload.id,
        employee: data,
      })
    );
  } catch (e) {
    yield put(fetchCreateEmployeeRequestError({ createdId: payload.id }));
    yield call(handleError, e);
  }
};

export default function* root() {
  yield takeEvery(fetchEmployeesAction, fetchEmployeeActionHandler);
  yield takeEvery(
    fetchCreateEmployeeRequest,
    fetchCreateEmployeeRequestHandler
  );
}
