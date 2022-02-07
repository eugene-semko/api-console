import React, { FC } from "react";
import styles from "./index.module.css";
import { ReactComponent as LogoIcon } from "../../assets/LOGO.svg";
import { useForm } from "react-hook-form";
import { Input } from "../ui/Input";

type propsType = {};
export const Authorization: FC<propsType> = (props) => {
   const { control, handleSubmit } = useForm();

   return (
      <div className={styles.container}>
         <LogoIcon className={styles.logo} />
         <form className={styles.form_container}>
            <Input
               control={control}
               className={styles.input}
               name={"login"}
               label={"Логин"}
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
               className={styles.input}
            />
         </form>
      </div>
   );
};
