import React, { FC, UIEventHandler, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { consoleSlice, consoleSliceSelectors } from "store/consoleSlice";
import { RequestHistoryItem } from "./RequestHistoryItem/RequestHistoryItem";
import { lsController } from "localStorage";
import { ReactComponent as ClearIcon } from "assets/clear.svg";
import { RSKHooks } from "react-dev-starter-pack";

type propsType = {};
export const RequestHistory: FC<propsType> = (props) => {
   const dispatch = useDispatch();
   const requestHistory = useSelector(consoleSliceSelectors.requestHistory);
   const [transform, setTransform] = useState(0);
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

   const ref = useRef<HTMLDivElement>(null);

   const handleScroll = (e: any) => {
      if (
         ref.current!.offsetWidth - window.innerWidth + 200 >
            Math.abs(transform) &&
         transform <= 0
      ) {
         setTransform(transform - e.deltaY / 2);
      } else {
         setTransform(0);
      }
   };
   return (
      <div className={styles.container} onWheel={handleScroll}>
         <div
            className={styles.history_container}
            ref={ref}
            style={{
               transform: `translateX(${transform}px)`,
            }}
         >
            {requestHistory.map((request) => (
               <RequestHistoryItem request={request} />
            ))}
         </div>

         <div className={styles.shadow} />
         <button
            className={styles.clear_button}
            onClick={() => {
               dispatch(consoleSlice.actions.resetRequestHistory());
               setTransform(0);
            }}
         >
            <ClearIcon />
         </button>
      </div>
   );
};
