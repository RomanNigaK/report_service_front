import { Link, Outlet } from "react-router-dom";
import iconLogo from "@static/icon/logo.svg";
import { useState } from "react";
import Modal from "components/modal/Modal";
import {
  getEmployeeUrl,
  getOptionsUrl,
  getProfileUrl,
  getReportUrl,
} from "Routing";
import { useAppSelector } from "@hooks/redux.hook";
import { getCurrentPage } from "redux/slices/navigation/selectors";
import { Pages } from "constans/enums";
import cn from "classnames";

export default function LayoutDesktop() {
  const [isVisbleModal, setIsVisibleModal] = useState(false);

  const currentPage = useAppSelector(getCurrentPage);

  return (
    <>
      {isVisbleModal && (
        <Modal onClose={() => setIsVisibleModal(false)}></Modal>
      )}
      <div>
        <div className="layout-main">
          <div className="layout-main__main-menu">
            <div className="layout-main__item logo">
              <img src={iconLogo} alt="" />
            </div>
            <Link to={getReportUrl()}>
              <div
                className={cn("layout-main__item report", {
                  reportactive: currentPage === "report" || currentPage === "details",
                })}
              />
            </Link>
            <Link to={getEmployeeUrl()}>
              <div
                className={cn("layout-main__item employee", {
                  employeeactive: currentPage === "employee",
                })}
              />
            </Link>
            <Link to={getProfileUrl()}>
              <div
                className={cn("layout-main__item profile", {
                  profileactive: currentPage === "profile",
                })}
              />
            </Link>
            <Link to={getOptionsUrl()}>
              <div
                className={cn("layout-main__item option", {
                  optionactive: currentPage === "option",
                })}
              />
            </Link>
          </div>
          <div className="layout-main__main">
            <div className="layout-main__main-header">
              <h2>Сервис Сводных Отчетов</h2>
              <div>{currentPage && Pages[currentPage]}</div>
            </div>
            <div className="layout-main__main-content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
