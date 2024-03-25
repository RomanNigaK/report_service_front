import { RootState } from "redux/store";

export const getRootReport = (state: RootState) => state.report;

export const getReports = (state:RootState)=>getRootReport(state).report

export const getDetailsReport = (state:RootState)=>getRootReport(state).details


export const getFetchstatus = (state: RootState) =>
getRootReport(state).status;

