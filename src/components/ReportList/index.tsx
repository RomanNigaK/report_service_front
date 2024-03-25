import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { useEffect, useState } from "react";
import { Report } from "redux/slices/report/slice";
import { fetchReportItemsAction } from "redux/slices/reportItem/actions";
import iconAdd from "@static/icon/add.svg";
import {
  getLoadReportId,
  getReportItems,
} from "redux/slices/reportItem/selectors";
import Items from "./Items";
import IconButton from "@components/commons/IconButton";
import ReportItemForm from "@components/forms/ReportItemForm";
import { getProfile } from "redux/slices/profile/selectors";

type ReportListProps = {
  report: Report;
  readonly: boolean;
};

export default function ReportList({
  readonly,
  report: { id, date, author, ordering },
}: ReportListProps) {
  const dispatch = useAppDispatch();
  const [isAddItem, setIsAddItem] = useState(false);

  const idProfile = useAppSelector(getProfile)?.id;

  const loadReportId = useAppSelector(getLoadReportId);

  const list = useAppSelector(getReportItems);
  useEffect(() => {
    if (id !== loadReportId) dispatch(fetchReportItemsAction({ reportId: id }));
  }, [dispatch, id, loadReportId]);
  return (
    <div className="modal-report">
      <h3>{`Отчет от ${date.date.split(" ")[0]} №-${ordering}`}</h3>
      <div className="modal-report__author">{author}</div>
      <div className="table-report-list">
        <div className="table-report-list__row header">
          <div className="table-report-list__item address">Адресс точки</div>
          <div className="table-report-list__item">Сумма</div>
        </div>
        {list.map((e) => {
          return (
            <Items
              item={e}
              key={e.id}
              reportId={id}
              isAuthor={e.authorId === idProfile}
              readonly={readonly}
            />
          );
        })}
      </div>
      {isAddItem && (
        <ReportItemForm onClose={() => setIsAddItem(false)} reportId={id} />
      )}
      {readonly && !isAddItem && (
        <IconButton transparent onClick={() => setIsAddItem(true)}>
          <img src={iconAdd} alt="" />
          Добавить адрес
        </IconButton>
      )}
    </div>
  );
}
