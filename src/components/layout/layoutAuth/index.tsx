import { Link, Outlet } from "react-router-dom";
import iconLogo from "@static/icon/logo.svg";

export default function LayoutAuth() {
  return (
    <div className="layout-auth">
      <div className="layout-auth__header">
        <div className="layout-auth__logo">
          <img src={iconLogo} alt="" />
        </div>
        <div className="layout-auth__title">
          <h2>Сервис Сводных Отчетов</h2>
          <div>
            <Link to="/auth/reg">Регистрация на сервисе</Link>
            <Link to="/auth">Вход</Link>
          </div>
        </div>
      </div>
      <div className="layout-auth__content">
        <Outlet />
      </div>
    </div>
  );
}
