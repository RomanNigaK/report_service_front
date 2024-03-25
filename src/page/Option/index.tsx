import { useAppDispatch } from "@hooks/redux.hook";
import { useEffect } from "react";
import { setCurrentPage } from "redux/slices/navigation/actions";

export default function Option() {
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    dispatch(setCurrentPage("option"));
  }, [dispatch]);
  return <div>Данные компании</div>;
}
