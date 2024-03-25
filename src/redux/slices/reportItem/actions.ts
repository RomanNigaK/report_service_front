import { createAction } from "@reduxjs/toolkit";
import { reportItemSlice } from "./slice";

export const fetchReportItemsAction = createAction<{ reportId: string }>(
  "reportItem/fetchReportItemsAction"
);

export const {
  setStatus,
  fetchAddItemRequest,
  fetchAddItemRequestError,
  fetchAddItemRequestSuccess,
  fetchDeleteItemRequest,
  fetchDeleteItemRequestError,
  fetchDeleteItemRequestSuccess,
  fetchReportItemsActionSeccess,
  fetchUpdateItemRequest,
  fetchUpdateItemRequestError,
  fetchUpdateItemRequestSuccess,
  fetchReportItemsAction2
} = reportItemSlice.actions;
