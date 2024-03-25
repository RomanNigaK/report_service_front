/* eslint-disable require-yield */
import { getRequest, postRequest } from ".";
import { call } from "redux-saga/effects";
import { ENDPOINTS } from "config/endpoints";
import { DetailsReport, Report } from "redux/slices/report/slice";
import { urlFromTemplate } from "utils/url";

export function* getReports() {
  const { data } = yield call(getRequest, ENDPOINTS.REPORT.GET);

  return data as Report[];
}

export function* createReport() {
  const { data } = yield call(postRequest, ENDPOINTS.REPORT.CREATE);

  return data as Report;
}

export function* getDetailsReport(year: string, month: string) {
  const { data } = yield call(
    getRequest,
    urlFromTemplate(ENDPOINTS.REPORT.DETAILS, { year, month })
  );

  return data as DetailsReport;
}
