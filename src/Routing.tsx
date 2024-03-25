import Tabs from "@components/Tabs";
import { useAppSelector } from "@hooks/redux.hook";

import LayoutAuth from "components/layout/layoutAuth";
import LayoutDesktop from "components/layout/layoutDesktop";
import Auth from "page/Auth";
import DetailsReport from "page/DetailsReport";
import Employee from "page/Employee";
import Option from "page/Option";
import Profile from "page/Profile";
import Reg from "page/Reg";
import Report from "page/Report";
import { PropsWithChildren, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { isAuthorized } from "redux/slices/user/selectors";

export const getAuthUrl = () => "/auth";
export const getRegUrl = () => "/auth/reg";

export const getReportUrl = () => "/";
export const getEmployeeUrl = () => "/employee";
export const getProfileUrl = () => "/profile";
export const getOptionsUrl = () => "/options";

export default function RequireAuth({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();
  const authorized = useAppSelector(isAuthorized);

  useEffect(() => {
    if (!authorized) {
      navigate(getAuthUrl(), { replace: true, state: { from: location } });
    }
  }, [authorized, location, navigate]);

  return <>{children}</>;
}

export function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <LayoutDesktop />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Tabs />}>
          <Route index element={<Report />}/>
          <Route path="details" element={<DetailsReport />}/>
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="employee" element={<Employee />} />
        <Route path="options" element={<Option />} />
      </Route>
      <Route path="auth" element={<LayoutAuth />}>
        <Route index element={<Auth />} />
        <Route path="reg" element={<Reg />} />
      </Route>
    </Routes>
  );
}
