import React, {
   ButtonHTMLAttributes,
   DetailedHTMLProps,
   DragEventHandler,
   FC,
   useEffect,
   useRef,
   useState,
} from "react";
import styles from "./index.module.css";
import { Button } from "../../../ui/Button";
import { ReactComponent as FormatIcon } from "../../../../assets/format.svg";
import classNames from "classnames";
import { ReactComponent as ResizeIcon } from "../../../../assets/resize.svg";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
   consoleSlice,
   consoleSliceSelectors,
} from "../../../../store/consoleSlice";
import { mainApi } from "../../../../api";
import { Preloader } from "../../../ui/Preloader";
import { lsController } from "../../../../localStorage";

type propsType = {};
export const RequestForm: FC<propsType> = (props) => {
   const dispatch = useDispatch();
   const { control, setValue } = useForm();

   const [isResponseLoading, setIsResponseLoading] = useState(false);
   const [isJsonInputError, setIsJsonInputError] = useState(true);
   const [initialWidth, setInitialWidth] = useState(0);
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
      }
      return () => {
         lsController.set("size", {
            left: leftWindowRef.current!.offsetWidth,
            right: rightWindowRef.current!.offsetWidth,
         });
      };
   }, []);
   useEffect(() => {
      if (isJsonInputError) {
         setIsJsonInputError(false);
      }
   }, [requestInput]);

   const resizeHandler = (event?: any) => {
      console.log(initialWidth - event.clientX);
      if (rightWindowRef.current && leftWindowRef.current && isResizeAllowed) {
         leftWindowRef.current.style.width = `${
            leftWindowRef.current.offsetWidth - (initialWidth - event.clientX)
         }px`;

         rightWindowRef.current.style.width = `${
            rightWindowRef.current.offsetWidth + (initialWidth - event.clientX)
         }px`;
      }
   };
   const formatInput = () => {
      try {
         setValue("request", JSON.stringify(JSON.parse(requestInput), null, 2));
      } catch (e) {
         setIsJsonInputError(true);
      }
   };

   const sendRequest = async () => {
      try {
         JSON.parse(requestInput);
         try {
            setIsResponseLoading(true);
            const response = await mainApi.request(JSON.parse(requestInput));
            dispatch(
               consoleSlice.actions.setCurrentResponse(
                  JSON.stringify(response, null, 2)
               )
            );
            setTimeout(() => {
               setIsResponseLoading(false);
            }, 600);
         } catch (e) {
            setTimeout(() => {
               setIsResponseLoading(false);
            }, 600);
            dispatch(
               consoleSlice.actions.setCurrentResponse(
                  JSON.stringify(e, null, 2)
               )
            );
         }
      } catch (e) {
         setIsJsonInputError(true);
      }
   };
   return (
      <div
         className={styles.container}
         onMouseMove={(e) => isResizeAllowed && resizeHandler(e)}
         onMouseUp={() => isResizeAllowed && setIsResizeAllowed(false)}
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
                  setInitialWidth(e.clientX);
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
