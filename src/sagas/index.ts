import { all, call } from "redux-saga/effects";
import profile from "./profile";
import user from "./user";
import report from "./report";
import reportItem from "./reportItem";
import employee from "./employee";

export default function* root() {
  yield all([
    call(user),
    call(profile),
    call(report),
    call(employee),
    call(reportItem),
  ]);
}
