import React, { FC, useEffect } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
   consoleSlice,
   consoleSliceSelectors,
} from "../../../../store/consoleSlice";
import { RequestHistoryItem } from "./RequestHistoryItem/RequestHistoryItem";
import { lsController } from "../../../../localStorage";

type propsType = {};
export const RequestHistory: FC<propsType> = (props) => {
   const dispatch = useDispatch();
   const requestHistory = useSelector(consoleSliceSelectors.requestHistory);

   useEffect(() => {
      if (
         lsController.get("history")?.length &&
         lsController.get("history") != null
      ) {
         dispatch(
            //@ts-ignore
            consoleSlice.actions.setRequestHistory(lsController.get("history"))
         );
      }
   }, []);
   useEffect(() => {
      lsController.set("history", requestHistory);
   }, [requestHistory]);
   return (
      <div className={styles.container}>
         {requestHistory.map((request) => (
            <RequestHistoryItem request={request} />
         ))}
      </div>
   );
};
