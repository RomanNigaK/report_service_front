import Field from "@components/commons/Field";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAuth } from "schema";
import Submit from "@components/commons/submit/Submit";
import IconButton from "@components/commons/IconButton";
import iconCheck from "@static/icon/check.svg";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { signInRequest } from "redux/slices/user/actions";
import { getFetchStatus } from "redux/slices/user/selectors";
import { FetchStatus } from "redux/types";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Loading from "@components/commons/Loading";

type FormData = {
  email: string;
  password: string;
};
export default function Auth() {
  const dispatch = useAppDispatch();
  const fetchStatus = useAppSelector(getFetchStatus);
  const navigate = useNavigate();
  const {
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaAuth),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(signInRequest(data));
  };
  useEffect(() => {
    if (fetchStatus === FetchStatus.Fetched) navigate("/");
  }, [fetchStatus, navigate]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Вход</h3>
      <Field
        name="email"
        placeholder="Email"
        value={() => getValues("email")}
        onChange={(val) => setValue("email", val)}
        error={errors.email?.message}
        onFocus={() => clearErrors("email")}
      />
      <Field
        name="password"
        placeholder="Пароль"
        value={() => getValues("password")}
        onChange={(val) => setValue("password", val)}
        error={errors.password?.message}
        onFocus={() => clearErrors("password")}
      />
      <Submit id="auth" />
      {fetchStatus !== FetchStatus.Fetching ? (
        <IconButton htmlforId="reg">
          <img src={iconCheck} alt="" />
          Войти
        </IconButton>
      ) : (
        <Loading text="Авторизация"/>
      )}
    </form>
  );
}
