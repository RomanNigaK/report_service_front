import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "redux/types";

export type ReportItem = {
  id: string;
  address: string;
  sum: number;
  authorId: string;
};

interface IStateReportItem {
  list: (ReportItem & { fetchStatus: FetchStatus })[];
  reportId?: string;
  status: FetchStatus;
}

const initialState: IStateReportItem = {
  list: [],
  status: FetchStatus.NotFetched,
};

export const reportItemSlice = createSlice({
  name: "reportItem",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.status = action.payload;
    },
    fetchReportItemsActionSeccess: (
      state,
      actions: PayloadAction<{ reportId: string; list: ReportItem[] }>
    ) => {
      state.list = actions.payload.list.map((e) => {
        return { ...e, fetchStatus: FetchStatus.NotFetched };
      });
      state.reportId = actions.payload.reportId;
      state.status = FetchStatus.Fetched;
    },
    fetchAddItemRequest: (
      state,
      action: PayloadAction<{ reportId: string; item: ReportItem }>
    ) => {
      state.list.push({
        ...action.payload.item,
        fetchStatus: FetchStatus.Fetching,
      });
    },
    fetchAddItemRequestSuccess: (
      state,
      action: PayloadAction<{ createdId: string; item: ReportItem }>
    ) => {
      const index = state.list.findIndex(
        (i) => i.id === action.payload.createdId
      );
      state.list[index] = {
        ...action.payload.item,
        fetchStatus: FetchStatus.Fetched,
      };
    },
    fetchAddItemRequestError: (
      state,
      action: PayloadAction<{ createdId: string }>
    ) => {
      state.list = state.list.filter((i) => i.id !== action.payload.createdId);
    },
    fetchUpdateItemRequest: (state, action: PayloadAction<ReportItem>) => {
      const index = state.list.findIndex((i) => i.id === action.payload.id);
      state.list[index] = {
        ...action.payload,
        fetchStatus: FetchStatus.Fetching,
      };
    },
    fetchUpdateItemRequestSuccess: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.list.findIndex((i) => i.id === action.payload.id);
      state.list[index] = {
        ...state.list[index],
        fetchStatus: FetchStatus.Fetched,
      };
    },
    fetchUpdateItemRequestError: (
      state,
      action: PayloadAction<{ modiferId: string; lastItem: ReportItem }>
    ) => {
      const index = state.list.findIndex(
        (i) => i.id === action.payload.modiferId
      );
      state.list[index] = {
        ...action.payload.lastItem,
        fetchStatus: FetchStatus.Error,
      };
    },
    fetchDeleteItemRequest: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.list.findIndex((i) => i.id === action.payload.id);
      state.list[index] = {
        ...state.list[index],
        fetchStatus: FetchStatus.Fetching,
      };
    },
    fetchDeleteItemRequestSuccess: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      state.list = state.list.filter((i) => i.id !== action.payload.id);
    },
    fetchDeleteItemRequestError: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const index = state.list.findIndex((i) => i.id === action.payload.id);
      state.list[index] = {
        ...state.list[index],
        fetchStatus: FetchStatus.Error,
      };
    },
  },
});
export default reportItemSlice.reducer;
