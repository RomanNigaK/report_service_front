import Calendar from "@components/calendar";
import IconButton from "@components/commons/IconButton";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { useEffect, useState } from "react";
import { setCurrentPage } from "redux/slices/navigation/actions";
import iconchek from "@static/icon/check.svg";
import { fetchDetailsReportAction } from "redux/slices/report/actions";
import {
  getDetailsReport,
  getFetchstatus,
} from "redux/slices/report/selectors";
import { FetchStatus } from "redux/types";

export default function DetailsReport() {
  const dispatch = useAppDispatch();

  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [loadedDate, setLoadedData] = useState<string>();

  const setDate = (ms: number) => {
    const date = new Date(ms);
    setMonth(
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + ""
    );
    setYear(date.getFullYear() + "");
  };

  const handleFetchDetailsReport = () => {
    if (month && year) {
      dispatch(fetchDetailsReportAction({ month, year }));
      setLoadedData(year + month);
    }
  };
  useEffect(() => {
    dispatch(setCurrentPage("details"));
  }, [dispatch]);

  const details = useAppSelector(getDetailsReport);

  const status = useAppSelector(getFetchstatus);

  return (
    <div>
      <Calendar
        setDate={setDate}
        details={
          year + month === loadedDate && status === FetchStatus.Fetched
            ? details
            : undefined
        }
      />

      <IconButton transparent onClick={handleFetchDetailsReport}>
        <img src={iconchek} alt="" />
        Сформировать
      </IconButton>
    </div>
  );
}
