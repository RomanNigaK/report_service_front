import React, { FC, useEffect, useState } from "react";
import cn from "classnames";
import { NoticeTypes } from "constans/enums";
import { useAppDispatch } from "@hooks/redux.hook";
import { removeMessage } from "redux/slices/errors/actions";
import { Notice } from "@components/ReportItem/Notice";

type ErrorMessageProps = {
  id: string;
  message: string;
  type?: NoticeTypes;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({
  id,
  message,
  type = NoticeTypes.error,
}) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("create");

  useEffect(() => {
    setStatus("show");
  }, []);

  const handleClose = () => {
    setStatus("close");

    setTimeout(() => {
      dispatch(removeMessage({ id }));
    }, 300);
  };

  return (
    <Notice
      type={type}
      timeout={5000}
      onClose={handleClose}
      message={message}
    />
  );
};
