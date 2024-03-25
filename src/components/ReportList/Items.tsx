import ReportItemForm from "@components/forms/ReportItemForm";
import { useAppDispatch } from "@hooks/redux.hook";
import { nanoid } from "@reduxjs/toolkit";
import cn from "classnames";
import { NoticeTypes } from "constans/enums";
import { useState } from "react";
import { addMessage } from "redux/slices/errors/actions";
import { ReportItem } from "redux/slices/reportItem/slice";
import { FetchStatus } from "redux/types";

type ItemProps = {
  reportId: string;
  isAuthor?: boolean;
  item: ReportItem & {
    fetchStatus: FetchStatus;
  };
  readonly: boolean;
};

export default function Items({
  item,
  reportId,
  isAuthor = false,
  readonly,
}: ItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();
  const handleEditRow = () => {
    if (!isAuthor)
      return dispatch(
        addMessage({
          id: nanoid(),
          message: "Очет был создан не вами, запрещено для редактирования",
          type: NoticeTypes.error,
        })
      );
    if (readonly)
      return dispatch(
        addMessage({
          id: nanoid(),
          message: "Отчеты не текущего месяца не подлежать редактированию",
          type: NoticeTypes.error,
        })
      );
    setIsEdit(true);
  };
  return (
    <>
      {isEdit ? (
        <ReportItemForm
          onClose={() => setIsEdit(false)}
          reportId={reportId}
          item={item}
          isEdit
        />
      ) : (
        <div
          className={cn("table-report-list__row", {
            loading: item.fetchStatus === FetchStatus.Fetching,
          })}
          onDoubleClick={handleEditRow}
        >
          <div className="table-report-list__item address">{item.address}</div>
          <div className="table-report__item">{item.sum}</div>
        </div>
      )}
    </>
  );
}
