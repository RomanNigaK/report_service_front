import * as yup from "yup";
const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,12}(\s*)?$/;
const enum FormPhrases {
  required = "обязательно для заполнения",
  phoneNotFalid = "номер телефона не корректен",
  min6 = "минимальное количество символов 6",
  passwordMismatch = "пароли не совпадают",
  emailNotValid = "email не корректен",
  notIsNumber = "введите целое число",
}

export const schemaAuth = yup.object().shape({
  email: yup
    .string()
    .email(FormPhrases.emailNotValid)
    .required(FormPhrases.required),
  password: yup.string().required(FormPhrases.required),
});

export const schemaReg = yup.object().shape({
  name: yup.string().required(FormPhrases.required),
  sername: yup.string().required(FormPhrases.required),
  patronymic: yup.string().required(FormPhrases.required),
  phone: yup
    .string()
    .required(FormPhrases.required)
    .matches(phoneRegExp, FormPhrases.phoneNotFalid),
  password: yup
    .string()
    .required(FormPhrases.required)
    .min(6, FormPhrases.min6),
  repeatPassword: yup
    .string()
    .required(FormPhrases.required)
    .oneOf([yup.ref("password")], FormPhrases.passwordMismatch),
  email: yup
    .string()
    .email(FormPhrases.emailNotValid)
    .required(FormPhrases.required),
});

export const schemaEmployee = yup.object().shape({
  id: yup.string().required(FormPhrases.required),
  name: yup.string().required(FormPhrases.required),
  sername: yup.string().required(FormPhrases.required),
  patronymic: yup.string().required(FormPhrases.required),
  phone: yup
    .string()
    .required(FormPhrases.required)
    .matches(phoneRegExp, FormPhrases.phoneNotFalid),
  password: yup
    .string()
    .required(FormPhrases.required)
    .min(6, FormPhrases.min6),
  repeatPassword: yup
    .string()
    .required(FormPhrases.required)
    .oneOf([yup.ref("password")], FormPhrases.passwordMismatch),
  email: yup
    .string()
    .email(FormPhrases.emailNotValid)
    .required(FormPhrases.required),
  role: yup.string(),
});

export const schemaReportItem = yup.object().shape({
  id: yup.string().required(FormPhrases.required),
  address: yup
    .string()
    .min(10, "Минимальная длина 10 символов")
    .required(FormPhrases.required),
  sum: yup
    .number()
    .typeError("Введите корректное число")
    .min(0.1, "Минимальная сумма 0.1 Р")
    .required(FormPhrases.required),
});
