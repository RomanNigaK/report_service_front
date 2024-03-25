export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    AUTH: "/auth",
    LOGOUT: "/logout",
    REGISTER: "/registration",
  },
  PROFILE: {
    GET: "/user",
    UPDATE: "/user",
    RESTORE: "/user",
    RESET: "/password-reset",
    UPDATEPASSWORD: "/user/password",
  },
  REPORT: {
    GET: "/reports",
    CREATE: "/report",
    ADDITEM: "/report/{reportId}/item",
    GETLISTBYID: "/report/{reportId}/list",
    UPDATEITEM: "/item/{itemId}",
    DELETEITEM: "/item/{itemId}",
    DETAILS: "/details/{year}/{month}"
  },
  EMPLOYEE: {
    GET: "/employees",
    CREATE: "/employee",
  },
};
