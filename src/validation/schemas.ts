import * as yup from "yup";
export const authorizationScheme = yup.object().shape({
   login: yup
      .string()
      .required("Заполните поле!")
      .matches(
         /[a-z,0-9]/giu,
         "Логин не должен содержать кириллические символы"
      ),
   password: yup
      .string()
      .required("Обязательно")
      .matches(
         /[a-z,0-9]/giu,
         "Пароль не должен содержать кириллические символы"
      ),
});
