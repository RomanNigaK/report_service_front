import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "redux/types";

type Date = {
  date: string;
  timezone_type: number;
  timezone: string;
};

export type Report = {
  id: string;
  author: string;
  date: Date;
  ordering: number;
  sum: string;
  amountRow: number;
  authorId: string;
};

export type Day =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31";

export type DetailsReport = Record<Day, number>;

interface IState {
  report: Report[];
  details: DetailsReport | null;
  status: FetchStatus;
}

const initialState: IState = {
  report: [],
  details: null,
  status: FetchStatus.NotFetched,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.status = action.payload;
    },
    fetchReportsActionSeccess: (state, actions: PayloadAction<Report[]>) => {
      state.report = actions.payload;
      state.status = FetchStatus.Fetched;
    },
    fetchCreateReportActionSuccess: (state, action: PayloadAction<Report>) => {
      state.report.unshift(action.payload);
    },
    fetchDetailsReportActionSuccess: (
      state,
      action: PayloadAction<DetailsReport>
    ) => {
      state.details = action.payload;
      state.status = FetchStatus.Fetched;
    },
  },
});
export default reportSlice.reducer;
