import React, { FC } from "react";
import styles from "./index.module.css";
import { ReactComponent as LogoIcon } from "../../assets/LOGO.svg";
import { useForm } from "react-hook-form";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../../sagas/actions";
import { processLoading } from "../../store/loadingSlice";
import { authorizationScheme } from "../../validation/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSlice, authSliceSelectors } from "../../store/authSlice";
import { ReactComponent as ErrorIcon } from "../../assets/meh.svg";

type propsType = {};
type formType = {
   login?: string;
   sublogin: string;
   password: string;
};
export const Authorization: FC<propsType> = (props) => {
   const dispatch = useDispatch();
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<any>({
      resolver: yupResolver(authorizationScheme),
   });

   const isLoading = useSelector(
      processLoading.get(sagaActions.auth.login.type)
   );
   const error = useSelector(authSliceSelectors.error);

   const submit = (data: formType) => {
      dispatch(
         sagaActions.auth.login({
            login: data.login,
            sublogin: data.sublogin,
            password: data.password,
         })
      );
   };

   return (
      <div className={styles.container}>
         <LogoIcon className={styles.logo} />
         <form
            className={styles.form_container}
            onSubmit={handleSubmit(submit)}
         >
            {error?.id && (
               <div className={styles.error_container}>
                  <div className={styles.error_header}>
                     <ErrorIcon className={styles.error_icon} /> Вход не вышел
                  </div>
                  <div className={styles.error_detailing}>
                     {JSON.stringify({ id: error.id, explain: error.explain })}
                  </div>
               </div>
            )}
            <Input
               control={control}
               className={styles.input}
               name={"login"}
               label={"Логин"}
               error={!!errors.login?.message}
            />
            <Input
               control={control}
               name={"sublogin"}
               label={"Сублогин"}
               optionalLabel={"Опционально"}
               className={styles.input}
            />
            <Input
               control={control}
               name={"password"}
               type={"password"}
               label={"Пароль"}
               error={!!errors.password?.message}
               className={styles.input}
            />
            <Button isLoading={isLoading}>Войти</Button>
         </form>
         <div className={styles.github_label}>@eugene-semko</div>
      </div>
   );
};
