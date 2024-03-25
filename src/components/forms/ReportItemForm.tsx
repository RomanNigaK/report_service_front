import Submit from "@components/commons/submit/Submit";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@hooks/redux.hook";
import { SubmitHandler, useForm } from "react-hook-form";

import { schemaReportItem } from "schema";

import { nanoid } from "@reduxjs/toolkit";

import { ReportItem } from "redux/slices/reportItem/slice";

import {
  fetchAddItemRequest,
  fetchUpdateItemRequest,
} from "redux/slices/reportItem/actions";

type ReportItemFormProps = {
  onClose: () => void;
  item?: ReportItem;
  reportId: string;
  isEdit?: boolean;
};

export default function ReportItemForm({
  onClose,
  item,
  reportId,
  isEdit = false,
}: ReportItemFormProps) {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ReportItem>({
    resolver: yupResolver(schemaReportItem),
    defaultValues: {
      id: item?.id || "createdId",
      address: item?.address,
      sum: item?.sum,
    },
  });

  const onSubmit: SubmitHandler<ReportItem> = (data) => {
    onClose();

    if (!item) {
      data.id = nanoid();
      return dispatch(fetchAddItemRequest({ item: data, reportId }));
    }

    dispatch(fetchUpdateItemRequest(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="table-report-list__row form">
        <div className="table-report-list__item address">
          <input
            type="text"
            {...register("address")}
            onBlur={isEdit ? handleSubmit(onSubmit) : undefined}
            onKeyDown={(e) =>
              e.key === "Escape" && !isEdit ? onClose() : undefined
            }
            autoFocus={isEdit ? false : true}
            autoComplete="off"
          />
        </div>
        <div className="table-report-list__item">
          <input
            type="text"
            {...register("sum")}
            onBlur={isEdit ? handleSubmit(onSubmit) : undefined}
            onKeyDown={(e) =>
              e.key === "Escape" && !isEdit ? onClose() : undefined
            }
            autoComplete="off"
          />
        </div>
      </div>
      {errors.address?.message ||
        (errors.sum?.message && (
          <div className="table-report-list__row error">
            <div className="table-report-list__item address">
              {errors.address?.message}
            </div>
            <div className="table-report-list__item">{errors.sum?.message}</div>
          </div>
        ))}

      <Submit id="addItem" />
    </form>
  );
}
