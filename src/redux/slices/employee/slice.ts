import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "redux/types";
import { CreateEmployeeData } from "./actions";
import { Roles } from "constans/enums";

export type Employee = {
  id: string;
  sername: string;
  name: string;
  patronymic: string;
  email: string;
  phone: string;
  role?: keyof typeof Roles;
};



interface IStateEmployee {
  employees: Employee[];
  status: FetchStatus;
  fetchstatusCreateEmployee: FetchStatus;
}

const initialState: IStateEmployee = {
  employees: [],
  status: FetchStatus.NotFetched,
  fetchstatusCreateEmployee: FetchStatus.NotFetched,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.status = action.payload;
    },
    setFetchstatusCreateEmployee: (
      state,
      action: PayloadAction<FetchStatus>
    ) => {
      state.fetchstatusCreateEmployee = action.payload;
    },
    fetchEmployeesActionSeccess: (
      state,
      actions: PayloadAction<Employee[]>
    ) => {
      state.employees = actions.payload;
      state.status = FetchStatus.Fetched;
    },
    fetchCreateEmployeeRequest: (state, action: PayloadAction<CreateEmployeeData>) => {
      const {password,repeatPassword, ...rest} = action.payload;
      state.employees.push(rest);
      state.fetchstatusCreateEmployee = FetchStatus.Fetching;
    },
    fetchCreateEmployeeRequestSuccess: (
      state,
      action: PayloadAction<{ createdId: string; employee: Employee }>
    ) => {
      const index = state.employees.findIndex(
        (i) => i.id === action.payload.createdId
      );
      state.employees[index] = { ...action.payload.employee };
      state.fetchstatusCreateEmployee = FetchStatus.Fetched;
    },
    fetchCreateEmployeeRequestError: (
      state,
      action: PayloadAction<{ createdId: string }>
    ) => {
      state.employees = state.employees.filter(
        (i) => i.id !== action.payload.createdId
      );
      state.fetchstatusCreateEmployee = FetchStatus.Error;
    },
  },
});
export default employeeSlice.reducer;
