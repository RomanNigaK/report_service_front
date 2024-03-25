import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import React, { useEffect } from "react";
import { setCurrentPage } from "redux/slices/navigation/actions";
import { getProfile } from "redux/slices/profile/selectors";

export default function Profile() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCurrentPage("profile"));
  }, [dispatch]);

  const profile = useAppSelector(getProfile);
  return (
    <div className="profile">
      <div>{profile?.sername}</div>
      <div>{profile?.name}</div>
      <div>{profile?.patronymic}</div>
      <div>{profile?.phone}</div>
      <div>{profile?.email}</div>
    </div>
  );
}
