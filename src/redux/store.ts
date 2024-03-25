import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./slices/profile/slice";
import navigationSlice from "./slices/navigation/slice";
import errorSlice from "./slices/errors/slice";
import createSagaMiddleware from "redux-saga";
import root from "./../sagas";
import userSlice from "./slices/user/slice";
import reportSlice from "./slices/report/slice";
import reportItemSlice from "./slices/reportItem/slice";
import employeeSlice from "./slices/employee/slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    profile: profileSlice,
    user: userSlice,
    error: errorSlice,
    report: reportSlice,
    reportItem: reportItemSlice,
    employee: employeeSlice,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(root);
type RootState = ReturnType<typeof store.getState>;
export type { RootState };

type AppDispatch = typeof store.dispatch;
export type { AppDispatch };
