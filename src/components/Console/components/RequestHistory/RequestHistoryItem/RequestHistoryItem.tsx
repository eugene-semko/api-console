import React, { FC, useRef, useState } from "react";
import styles from "./index.module.css";
import { ReactComponent as GoodRequest } from "assets/good_request.svg";
import { ReactComponent as BadRequest } from "assets/bad_request.svg";
import { ReactComponent as MenuIcon } from "assets/resize.svg";
import { RSKHooks } from "react-dev-starter-pack";
import classNames from "classnames";
import { consoleSlice, requestType } from "store/consoleSlice";
import { useDispatch } from "react-redux";
import { sagaActions } from "../../../../../sagas/actions";

type propsType = {
   request: requestType;
};
export const RequestHistoryItem: FC<propsType> = ({ request }) => {
   const dispatch = useDispatch();

   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [showCopyAction, setShowCopyAction] = useState<{
      isShow: boolean;
      success: boolean;
   }>({
      isShow: false,
      success: true,
   });
   const menuRef = useRef(null);

   RSKHooks.useBlurred(menuRef, setIsMenuOpen, isMenuOpen);

   const pickRequest = () => {
      dispatch(consoleSlice.actions.setCurrentRequest(request.resendAction));
   };

   const resendAction = () => {
      dispatch(
         sagaActions.console.createRequest(JSON.stringify(request.resendAction))
      );
   };

   const copyAction = () => {
      navigator.clipboard
         .writeText(JSON.stringify(request.resendAction, null, 2))
         .then((response) => {
            setShowCopyAction({
               isShow: true,
               success: true,
            });
            setTimeout(() => {
               setShowCopyAction({
                  isShow: false,
                  success: true,
               });
            }, 800);
         })
         .catch((e) => {
            setShowCopyAction({
               isShow: true,
               success: false,
            });
         });
   };
   const displayCopyAction = () => {
      if (showCopyAction.success) {
         return <div className={styles.copied}>Скопировано</div>;
      } else {
         return (
            <div
               className={classNames({
                  [styles.copied]: true,
                  [styles.copied_failed]: true,
               })}
            >
               Неудача!
            </div>
         );
      }
   };
   const removeAction = () => {
      dispatch(consoleSlice.actions.removeRequestFromHistory(request));
   };

   return (
      <button
         className={classNames({
            [styles.container]: true,
            [styles.container_ovrflw_hidden]: showCopyAction.isShow,
         })}
         onClick={pickRequest}
      >
         {request.success ? (
            <GoodRequest className={styles.status_icon} />
         ) : (
            <BadRequest className={styles.status_icon} />
         )}
         {request.action}
         {showCopyAction.isShow && (
            <div className={styles.copied_container}>{displayCopyAction()}</div>
         )}

         <MenuIcon
            className={styles.menu_icon}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
         />
         {isMenuOpen && (
            <div
               ref={menuRef}
               className={styles.menu_container}
               onClick={() => setIsMenuOpen(false)}
            >
               <button
                  className={classNames({
                     [styles.menu_button]: true,
                  })}
                  onClick={resendAction}
               >
                  Выполнить
               </button>
               <button
                  className={classNames({
                     [styles.menu_button]: true,
                  })}
                  onClick={copyAction}
               >
                  Скопировать
               </button>
               <div className={styles.line} />
               <button
                  className={classNames({
                     [styles.menu_button_delete]: true,

                     [styles.menu_button]: true,
                  })}
                  onClick={removeAction}
               >
                  Удалить
               </button>
            </div>
         )}
      </button>
   );
};
