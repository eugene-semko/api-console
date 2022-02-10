import React, { FC } from "react";
import styles from "./index.module.css";
import { Header } from "./components/Header";
import { RequestHistory } from "./components/RequestHistory";
import { RequestForm } from "./components/RequestForm";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

type propsType = {};
export const Console: FC<propsType> = (props) => {
   const handle = useFullScreenHandle();

   return (
      <FullScreen handle={handle} className={styles.container}>
         <Header fullscreenHandle={handle} />
         <RequestHistory />
         <RequestForm />
      </FullScreen>
   );
};
