import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { Button } from "components/ui/Button";
import { ReactComponent as FormatIcon } from "assets/format.svg";
import classNames from "classnames";
import { ReactComponent as ResizeIcon } from "assets/resize.svg";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { consoleSlice, consoleSliceSelectors } from "store/consoleSlice";
import { mainApi } from "api";
import { Preloader } from "components/ui/Preloader";
import { lsController } from "localStorage";
import { sagaActions } from "../../../../sagas/actions";
import { processLoading } from "../../../../store/loadingSlice";

type propsType = {};
export const RequestForm: FC<propsType> = (props) => {
   const dispatch = useDispatch();
   const { control, setValue } = useForm();

   const isResponseLoading = useSelector(
      processLoading.get(sagaActions.console.createRequest.type)
   );
   const storeRequest = useSelector(consoleSliceSelectors.currentRequest);
   const isJsonInputError = useSelector(consoleSliceSelectors.isJsonInputError);
   const isResponseError = useSelector(consoleSliceSelectors.isResponseError);
   const [initialClickWidth, setInitialClickWidth] = useState(0);
   const [isResizeAllowed, setIsResizeAllowed] = useState(false);

   const currentResponse = useSelector(consoleSliceSelectors.currentResponse);

   const leftWindowRef = useRef<HTMLDivElement>(null);
   const rightWindowRef = useRef<HTMLDivElement>(null);

   const requestInput = useWatch({ control, name: "request" });

   useEffect(() => {
      if (
         lsController.get("size")?.left &&
         lsController.get("size")?.right &&
         leftWindowRef.current &&
         rightWindowRef.current
      ) {
         leftWindowRef.current.style.width =
            lsController.get("size")!.left + "px";
         rightWindowRef.current.style.width =
            lsController.get("size")!.right + "px";
      } else if (
         !lsController.get("size") &&
         leftWindowRef.current &&
         rightWindowRef.current
      ) {
         lsController.set("size", {
            left: leftWindowRef.current.offsetWidth,
            right: rightWindowRef.current.offsetWidth,
         });
      }
   }, []);

   useEffect(() => {
      if (isJsonInputError) {
         dispatch(consoleSlice.actions.setJsonInputError(false));
      }
   }, [requestInput]);

   useEffect(() => {
      if (storeRequest) {
         setValue("request", JSON.stringify(storeRequest, null, 2));
         dispatch(consoleSlice.actions.setCurrentResponse(""));
         dispatch(consoleSlice.actions.setIsResponseError(false));
      }
   }, [storeRequest]);

   const resizeHandler = (event?: any) => {
      if (rightWindowRef.current && leftWindowRef.current && isResizeAllowed) {
         leftWindowRef.current.style.width = `${
            lsController.get("size")!.left - (initialClickWidth - event.clientX)
         }px`;

         rightWindowRef.current.style.width = `${
            lsController.get("size")!.right +
            (initialClickWidth - event.clientX)
         }px`;
      }
      if (leftWindowRef.current!.offsetWidth < 70) {
         leftWindowRef.current!.style.width = "70px";
      }
      if (rightWindowRef.current!.offsetWidth < 70) {
         rightWindowRef.current!.style.width = "70px";
      }
   };
   const formatInput = () => {
      try {
         setValue("request", JSON.stringify(JSON.parse(requestInput), null, 2));
      } catch (e) {
         dispatch(consoleSlice.actions.setJsonInputError(true));
      }
   };

   const sendRequest = () => {
      dispatch(sagaActions.console.createRequest(requestInput));
   };
   return (
      <div
         className={styles.container}
         onMouseMove={(e) => isResizeAllowed && resizeHandler(e)}
         onMouseUp={() => {
            isResizeAllowed && setIsResizeAllowed(false);
            lsController.set("size", {
               left: leftWindowRef.current!.offsetWidth,
               right: rightWindowRef.current!.offsetWidth,
            });
         }}
      >
         <div className={styles.consoles_container}>
            <div className={styles.request_container} ref={leftWindowRef}>
               <div className={styles.request_title}>Запрос:</div>
               <textarea
                  {...control.register("request")}
                  className={classNames({
                     [styles.textarea]: true,
                     [styles.textarea_error]: isJsonInputError,
                  })}
               />
            </div>
            <button
               className={styles.resize_container}
               onMouseDown={(e) => {
                  setInitialClickWidth(e.clientX);
                  setIsResizeAllowed(true);
               }}
            >
               <ResizeIcon />
            </button>
            <div className={styles.response_container} ref={rightWindowRef}>
               <div className={styles.request_title}>Ответ:</div>
               {isResponseLoading ? (
                  <div className={styles.textarea}>
                     <Preloader variant={"fit-space"} />
                  </div>
               ) : (
                  <textarea
                     name={"response"}
                     disabled={true}
                     value={currentResponse}
                     className={classNames({
                        [styles.textarea]: true,
                        [styles.textarea_error]: isResponseError,
                     })}
                  />
               )}
            </div>
         </div>
         <div className={styles.footer_container}>
            <Button onClick={sendRequest}>Отправить</Button>
            <div className={styles.link}>@eugene-semko</div>
            <button className={styles.format_button} onClick={formatInput}>
               <FormatIcon className={styles.format_icon} />
               Форматировать
            </button>
         </div>
      </div>
   );
};
