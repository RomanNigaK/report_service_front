/* eslint-disable require-yield */
import { getRequest, postRequest } from ".";
import { call } from "redux-saga/effects";
import { ENDPOINTS } from "config/endpoints";
import { Employee } from "redux/slices/employee/slice";
import { urlFromTemplate } from "utils/url";
import { CreateEmployeeData } from "redux/slices/employee/actions";

export function* getEmployees() {
  const { data } = yield call(getRequest, ENDPOINTS.EMPLOYEE.GET);

  return data as Employee[];
}

export function* createEmploye(params: CreateEmployeeData) {
  const { data } = yield call(
    postRequest,
    urlFromTemplate(ENDPOINTS.EMPLOYEE.CREATE, {}),
    params
  );

  return data as Employee;
}
