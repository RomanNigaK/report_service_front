import { takeEvery, call, put, delay } from "redux-saga/effects";
import { handleError } from "./errors";

import {
  fetchAddItemRequest,
  fetchAddItemRequestError,
  fetchAddItemRequestSuccess,
  fetchDeleteItemRequest,
  fetchDeleteItemRequestError,
  fetchDeleteItemRequestSuccess,
  fetchReportItemsAction,
  fetchReportItemsAction2,
  fetchReportItemsActionSeccess,
  fetchUpdateItemRequest,
  fetchUpdateItemRequestError,
  fetchUpdateItemRequestSuccess,
  setStatus,
} from "redux/slices/reportItem/actions";
import { FetchStatus } from "redux/types";
import {
  addReportItem,
  deleteReportItem,
  getReportItems,
  updateReportItem,
} from "./api/reportItem";
import { Saga } from "./types";
import { ReportItem } from "redux/slices/reportItem/slice";

const fetchReportItemsActionHandler: Saga<{ reportId: string }> = function* ({
  payload,
}) {
  const { reportId } = payload;
  try {
    yield put(setStatus(FetchStatus.Fetching));
    const { data } = yield call(getReportItems, reportId);

    yield put(
      fetchReportItemsActionSeccess({
        list: data.items,
        reportId: data.reportId,
      })
    );
  } catch (e) {
    yield call(handleError, e);
  }
};

const fetchAddItemRequestHandle: Saga<{
  reportId: string;
  item: ReportItem;
}> = function* ({ payload }) {
  const { item, reportId } = payload;
  try {
    const { data } = yield call(addReportItem, reportId, item);

    yield put(fetchAddItemRequestSuccess({ createdId: item.id, item: data }));
  } catch (e) {
    yield put(fetchAddItemRequestError({ createdId: item.id }));
    yield call(handleError, e);
  }
};

const fetchUpdateItemRequestHandle: Saga<ReportItem> = function* ({ payload }) {
  try {
    yield call(updateReportItem, payload);

    yield put(fetchUpdateItemRequestSuccess({ id: payload.id }));
  } catch (e) {
    yield put(
      fetchUpdateItemRequestError({ modiferId: payload.id, lastItem: payload })
    );
    yield call(handleError, e);
  }
};

const fetchDeleteItemRequestHandle: Saga<Pick<ReportItem, "id">> = function* ({
  payload,
}) {
  const { id } = payload;
  try {
    yield call(deleteReportItem, id);

    yield put(fetchDeleteItemRequestSuccess({ id }));
  } catch (e) {
    yield put(fetchDeleteItemRequestError({ id }));
    yield call(handleError, e);
  }
};

export default function* root() {
  yield takeEvery(fetchReportItemsAction, fetchReportItemsActionHandler);
  yield takeEvery(fetchAddItemRequest, fetchAddItemRequestHandle);
  yield takeEvery(fetchUpdateItemRequest, fetchUpdateItemRequestHandle);
  yield takeEvery(fetchDeleteItemRequest, fetchDeleteItemRequestHandle);
}
