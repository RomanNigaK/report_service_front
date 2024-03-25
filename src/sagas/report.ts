import { takeEvery, call, put, delay } from "redux-saga/effects";
import { getProfile } from "./api/profile";
import { handleError } from "./errors";
import {
  fetchCreateReportAction,
  fetchCreateReportActionSuccess,
  fetchDetailsReportAction,
  fetchDetailsReportActionSuccess,
  fetchReportsAction,
  fetchReportsActionSeccess,
  setStatus,
} from "redux/slices/report/actions";
import { createReport, getDetailsReport, getReports } from "./api/report";
import { Saga } from "./types";
import { FetchStatus } from "redux/types";

const fetchReportsActionHandler = function* () {
  try {
    yield put(setStatus(FetchStatus.Fetching));
    const { data } = yield call(getReports);

    yield put(fetchReportsActionSeccess(data));
  } catch (e) {
    yield call(handleError, e);
  }
};

const fetchCreateReportActionHandle = function* () {
  try {

    const { data } = yield call(createReport);

    yield put(fetchCreateReportActionSuccess(data));
  } catch (e) {
    yield call(handleError, e);
  }
};

const fetchDetailsReportActionHandler: Saga<{
  year: string;
  month: string;
}> = function* ({ payload }) {
  const { month, year } = payload;
  try {
    yield put(setStatus(FetchStatus.Fetching));
    const { data } = yield call(getDetailsReport, year, month);

    yield put(fetchDetailsReportActionSuccess(data));
  } catch (e) {
    yield call(handleError, e);
  }
};

export default function* root() {
  yield takeEvery(fetchReportsAction, fetchReportsActionHandler);
  yield takeEvery(fetchCreateReportAction, fetchCreateReportActionHandle);
  yield takeEvery(fetchDetailsReportAction, fetchDetailsReportActionHandler);
}
