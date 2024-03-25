import { createAction } from "@reduxjs/toolkit";
import { employeeSlice } from "./slice";
import { Roles } from "constans/enums";

export const fetchEmployeesAction = createAction(
  "employee/fetchEmployeesAction"
);

export type CreateEmployeeData = {
  id: string;
  name: string;
  sername: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword: string;
  role?: keyof typeof Roles;
};

export const {
  fetchEmployeesActionSeccess,
  setStatus,
  fetchCreateEmployeeRequest,
  fetchCreateEmployeeRequestError,
  fetchCreateEmployeeRequestSuccess,
  setFetchstatusCreateEmployee,
} = employeeSlice.actions;
