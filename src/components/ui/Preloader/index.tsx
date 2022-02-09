import React, { FC } from "react";
import styles from "./index.module.css";
import { ReactComponent as LoaderIcon } from "../../../assets/loader.svg";

type propsType = {};
export const Preloader: FC<propsType> = (props) => {
   return (
      <div className={styles.container}>
         <LoaderIcon className={styles.loader} />
      </div>
   );
};
