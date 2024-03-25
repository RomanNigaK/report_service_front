import cn from "classnames";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "redux/store";

export const enum ModalSize{
  small,
  medium,
  large,
  max,
  toMaxFromLarge,
  toSmall,
  toMedium,
  toMediumFromSmall,
  toSmallFromMedium,
}

interface IModal extends PropsWithChildren {
  onClose: () => void;
  size?:keyof typeof ModalSize
}

export default function Modal({ children, onClose, size = "small" }: IModal) {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    if (element.classList.contains("modal")) onClose();
  };

  return (
    <Provider store={store}>
      <div className="modal" onClick={handleClose}>
        <div className={`modal__content ${size}`}>{children}</div>
      </div>
    </Provider>
  );
}

export function ModalUpLevel({ children, onClose, size = "small" }: IModal) {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    if (element.classList.contains("modal-up")) onClose();
  };

  return (
    <Provider store={store}>
      <div className="modal-up" onClick={handleClose}>
        <div className={`modal__content ${size}`}>{children}</div>
      </div>
    </Provider>
  );
}