import Field from "@components/commons/Field";
import IconButton from "@components/commons/IconButton";
import Submit from "@components/commons/submit/Submit";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { FetchStatus } from "redux/types";
import { schemaEmployee } from "schema";
import iconCheck from "@static/icon/check.svg";
import { getFetchStatusCreateEmployee } from "redux/slices/employee/selectors";
import {
  CreateEmployeeData,
  fetchCreateEmployeeRequest,
} from "redux/slices/employee/actions";
import { nanoid } from "@reduxjs/toolkit";
import RadioGroup from "@components/commons/RadioGroup";
import { useState } from "react";

type CreateEmployeeFormProps = {
  onClose: () => void;
};

export default function CreateEmployeeForm({
  onClose,
}: CreateEmployeeFormProps) {
  const dispatch = useAppDispatch();
  const fetchStatus = useAppSelector(getFetchStatusCreateEmployee);
  const {
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<CreateEmployeeData>({
    resolver: yupResolver(schemaEmployee),
    defaultValues: {
      id: "createdId",
    },
  });

  const [role, setRole] = useState<string | undefined>();

  const onSubmit: SubmitHandler<CreateEmployeeData> = (data) => {
    if (!role) {
      return setError("role", {
        message: "sdfsdf" || undefined,
      });
    }
    data.id = nanoid();
    data.role = role;
    dispatch(fetchCreateEmployeeRequest(data));
    onClose();
  };

  const handleSetValueRadio = (role: string) => {
    setRole(role);
    if (errors.role) clearErrors("role");
  };

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
        placeholder="Фамилия"
        value={() => getValues("sername")}
        onChange={(val) => setValue("sername", val)}
        error={errors.sername?.message}
        onFocus={() => clearErrors("sername")}
      />
      <Field
        name="patronymic"
        placeholder="Отчество"
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
      <RadioGroup
        buttons={[
          { name: "Администратор", value: "ROLE_ADMIN" },
          { name: "Менеджер", value: "ROLE_MANAGER" },
        ]}
        label="Права доступа"
        setValue={handleSetValueRadio}
        error={errors.role?.message}
      />
      <Submit id="createEmployee" />
      {fetchStatus !== FetchStatus.Fetching ? (
        <IconButton htmlforId="createEmployee">
          <img src={iconCheck} alt="" />
          Добавить сотрудника
        </IconButton>
      ) : (
        "Загрузка"
      )}
    </form>
  );
}
