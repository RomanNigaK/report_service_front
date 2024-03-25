import React, { FC, useEffect } from "react";
import cn from "classnames";
import { NoticeTypes } from "constans/enums";
import iconCheck from "@static/icon/notice-type-ok.svg";
import iconError from "@static/icon/notice-type-error.svg";
import iconLogo from "@static/icon/logo-min.svg";

type NoticeProps = {
  message: string;
  type: NoticeTypes;
  timeout: number;
  onClose: () => void;

};

export const Notice: FC<NoticeProps> = ({
  type,
  message,
  timeout = 50000,
  onClose,
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(onClose, timeout);
    return () => clearTimeout(timeoutId);
  }, [onClose, timeout]);

  return (
    <div className="notice-wrapper">
      <div
        className={cn("notice")}
      >
        <div className="notice__header">
          <div>
            <img src={iconLogo} alt="" />
            Системное сообщение
          </div>

          <i onClick={onClose}/>
        </div>
        <div className="notice__message">
          <p>
            <img
              src={type === NoticeTypes.success ? iconCheck : iconError}

            />
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
