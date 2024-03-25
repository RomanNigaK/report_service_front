import { createAction } from "@reduxjs/toolkit";
import { profileSlice } from "./slice";

export const fetchPfofileAction = createAction(
    "profile/fetchPfofileAction"
);

export const {fetchPfofileActionSeccess, setStatus} =profileSlice.actions;
