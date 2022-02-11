import React, { ButtonHTMLAttributes, FC } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import { ReactComponent as LoaderIcon } from "../../../assets/loader.svg";

type propsType = {
   isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<propsType> = (props) => {
   return (
      <button
         {...props}
         className={classNames({
            [styles.container]: true,
            [styles.disabled]: props.disabled,
         })}
      >
         {props.isLoading ? (
            <LoaderIcon className={styles.loading} />
         ) : (
            props.children
         )}
      </button>
   );
};
