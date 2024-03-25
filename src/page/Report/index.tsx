import IconButton from "@components/commons/IconButton";
import Modal from "@components/modal/Modal";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { useEffect, useState } from "react";
import { setCurrentPage } from "redux/slices/navigation/actions";
import {
  fetchCreateReportAction,
  fetchReportsAction,
} from "redux/slices/report/actions";
import { isAuthorized } from "redux/slices/user/selectors";
import iconAdd from "@static/icon/add.svg";
import { getFetchstatus, getReports } from "redux/slices/report/selectors";
import ReportItem from "@components/ReportItem";
import ReportList from "@components/ReportList";
import { Report } from "redux/slices/report/slice";
import { FetchStatus } from "redux/types";
import Loading from "@components/commons/Loading";

export default function Report() {
  const dispatch = useAppDispatch();
  const authorized = useAppSelector(isAuthorized);
  const [isVisbleModal, setIsVisibleModal] = useState(false);

  const [component, setComponent] = useState<JSX.Element>();

  const reports = useAppSelector(getReports);

  const fetchStatus = useAppSelector(getFetchstatus);

  const currentDay = Date.now();
  const d = new Date(currentDay);

  const d2 = `${d.getFullYear()}-${
    d.getMonth() > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)
  }-${d.getDate()}`;

  const isCurrentDay = reports.filter((i) => {
    const dt = i.date.date.split(" ")[0];
    if (dt === d2) return i;
  });

  const handleCreateReport = () => {
    dispatch(fetchCreateReportAction());
  };

  const openReportListForm = (report: Report, readOnly: boolean) => {
    setComponent(<ReportList readonly={readOnly} report={report} />);
    setIsVisibleModal(true);
  };

  useEffect(() => {
    dispatch(setCurrentPage("report"));
  }, [dispatch]);

  useEffect(() => {
    if (authorized) dispatch(fetchReportsAction());
  }, [authorized, dispatch]);

  return (
    <>
      {isVisbleModal && component && (
        <Modal onClose={() => setIsVisibleModal(false)} size="large">
          {component}
        </Modal>
      )}
      {isCurrentDay.length === 0 && (
        <IconButton transparent onClick={handleCreateReport}>
          <img src={iconAdd} alt="" />
          Создать отчет за текущий день
        </IconButton>
      )}

      <div className="table-report">
        <div className="table-report__row header">
          <div className="table-report__item">Номер</div>
          <div className="table-report__item">Дата</div>
          <div className="table-report__item">Сумма</div>
          <div className="table-report__item author">Автор</div>
          <div className="table-report__item">Кол-во</div>
        </div>

        {fetchStatus === FetchStatus.Fetching ? (
          <Loading text="Загружаем список отчетов" />
        ) : (
          reports.map((e) => {
            return (
              <ReportItem
                openDetails={openReportListForm}
                report={e}
                key={e.id}
              />
            );
          })
        )}
      </div>
    </>
  );
}
