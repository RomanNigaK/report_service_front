import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from ".";
import { call } from "redux-saga/effects";
import { ENDPOINTS } from "config/endpoints";
import { ReportItem } from "redux/slices/reportItem/slice";
import { urlFromTemplate } from "utils/url";

export function* getReportItems(reportId: string) {
  const { data } = yield call(
    getRequest,
    urlFromTemplate(ENDPOINTS.REPORT.GETLISTBYID, { reportId })
  );

  return data as {items:ReportItem[],reportId:string};
}

export function* addReportItem(reportId: string, params: ReportItem) {
  const { data } = yield call(
    postRequest,
    urlFromTemplate(ENDPOINTS.REPORT.ADDITEM, { reportId }),
    params
  );

  return data as ReportItem;
}

export function* deleteReportItem(itemId: string) {
  yield call(
    deleteRequest,
    urlFromTemplate(ENDPOINTS.REPORT.DELETEITEM, { itemId })
  );
}

export function* updateReportItem(params: ReportItem) {
  const { id, ...rest } = params;
  yield call(
    putRequest,
    urlFromTemplate(ENDPOINTS.REPORT.UPDATEITEM, {
      itemId: id,
    }),
    { params: rest }
  );
}
