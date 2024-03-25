export enum Errors {
  InvalidCred = "Invalid credentials.",
  UnspecifiedServerError = "Server error.",
}

export const AVAILABLE_ERRORS: Record<Errors | string, string> = {
  [Errors.InvalidCred]: "Не верная пара логин.пароль",
  [Errors.UnspecifiedServerError]: "Неопределенная ошибка сервера",
};

export const errorHandler = (message: Errors | string) => {
  if (message === undefined) return null;
  return (
    AVAILABLE_ERRORS[message] || AVAILABLE_ERRORS[Errors.UnspecifiedServerError]
  );
};
