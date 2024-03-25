import { createAction } from "@reduxjs/toolkit";
import { reportSlice } from "./slice";

export const fetchReportsAction = createAction("report/fetchReportsAction");

export const fetchCreateReportAction = createAction(
  "report/fetchCreateReportAction"
);

export const fetchDetailsReportAction = createAction<{
  year: string;
  month: string;
}>("report/fetchDetailsReportAction");

export const {
  setStatus,
  fetchReportsActionSeccess,
  fetchCreateReportActionSuccess,
  fetchDetailsReportActionSuccess
} = reportSlice.actions;
