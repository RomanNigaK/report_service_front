import { useAppSelector } from "@hooks/redux.hook";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { getCurrentPage } from "redux/slices/navigation/selectors";
import { getIsAdmin } from "redux/slices/user/selectors";

export default function Tabs() {
  const currentPage = useAppSelector(getCurrentPage);
  const isAdmin = useAppSelector(getIsAdmin);
  return (
    <div className="tabs">
      <Link
        to="/"
        style={currentPage === "report" ? { color: "black" } : undefined}
      >
        Отчеты
      </Link>
      {isAdmin && (
        <Link
          to="/details"
          style={currentPage === "details" ? { color: "black" } : undefined}
        >
          Сводный отчет
        </Link>
      )}

      <div>
        <Outlet />
      </div>
    </div>
  );
}
