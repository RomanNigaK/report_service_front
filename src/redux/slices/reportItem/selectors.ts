import { RootState } from "redux/store";

export const getRootReportItem = (state: RootState) => state.reportItem;

export const getReportItems = (state: RootState) =>
  getRootReportItem(state).list;

export const getFetchstatus = (state: RootState) =>
  getRootReportItem(state).status;

  export const getLoadReportId = (state: RootState) =>
  getRootReportItem(state).reportId;
