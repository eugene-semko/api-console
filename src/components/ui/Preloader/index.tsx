import React, { FC } from "react";
import styles from "./index.module.css";
import { ReactComponent as LoaderIcon } from "../../../assets/loader.svg";
import classNames from "classnames";

type propsType = {
   variant?: "fit-space";
};
export const Preloader: FC<propsType> = (props) => {
   return (
      <div
         className={classNames({
            [styles.container]: true,
            [styles.fit_space_container]: props.variant == "fit-space",
         })}
      >
         <LoaderIcon className={styles.loader} />
      </div>
   );
};
