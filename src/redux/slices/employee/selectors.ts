import { RootState } from "redux/store";

export const getRootEmployee = (state: RootState) => state.employee;

export const getFetchStatusCreateEmployee = (state:RootState)=>getRootEmployee(state).fetchstatusCreateEmployee

export const getFetchStatus = (state:RootState)=>getRootEmployee(state).status


export const getEmployee = (state:RootState)=>getRootEmployee(state).employees

