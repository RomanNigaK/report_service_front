import Field from "@components/commons/Field";
import IconButton from "@components/commons/IconButton";
import Submit from "@components/commons/submit/Submit";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { schemaReg } from "schema";
import iconCheck from "@static/icon/check.svg";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { signInRequest, signUpRequest } from "redux/slices/user/actions";
import { getAuth, getFetchStatus } from "redux/slices/user/selectors";
import { FetchStatus } from "redux/types";
import { Link } from "react-router-dom";

type FormData = {
  name: string;
  sername: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export default function Reg() {
  const dispatch = useAppDispatch();
  const fetchStatus = useAppSelector(getFetchStatus);

  const {
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaReg),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(signUpRequest({ data }));
  };
  if (fetchStatus === FetchStatus.Fetched)
    return (
      <form>
        <h3>Регистрация прошла успешно</h3>
        <Link to="/">
          Продолжить работу 
        </Link>
      </form>
    );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Регистрация</h3>
      <Field
        name="name"
        placeholder="Имя"
        value={() => getValues("name")}
        onChange={(val) => setValue("name", val)}
        error={errors.name?.message}
        onFocus={() => clearErrors("name")}
      />
      <Field
        name="Фамилия"
        placeholder="sername"
        value={() => getValues("sername")}
        onChange={(val) => setValue("sername", val)}
        error={errors.sername?.message}
        onFocus={() => clearErrors("sername")}
      />
      <Field
        name="Отчество"
        placeholder="patronymic"
        value={() => getValues("patronymic")}
        onChange={(val) => setValue("patronymic", val)}
        error={errors.patronymic?.message}
        onFocus={() => clearErrors("patronymic")}
      />
      <Field
        name="phone"
        placeholder="Телефон"
        value={() => getValues("phone")}
        onChange={(val) => setValue("phone", val)}
        error={errors.phone?.message}
        onFocus={() => clearErrors("phone")}
      />
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
      <Field
        name="repeatPassword"
        placeholder="Повторите пароль"
        value={() => getValues("repeatPassword")}
        onChange={(val) => setValue("repeatPassword", val)}
        error={errors.repeatPassword?.message}
        onFocus={() => clearErrors("repeatPassword")}
      />
      <Submit id="reg" />
      {fetchStatus !== FetchStatus.Fetching ? (
        <IconButton htmlforId="reg">
          <img src={iconCheck} alt="" />
          Создать аккаунт
        </IconButton>
      ) : (
        "Загрузка"
      )}
    </form>
  );
}
