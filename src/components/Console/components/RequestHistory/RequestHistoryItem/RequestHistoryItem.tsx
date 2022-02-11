import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { requestType } from "../../../../../store/consoleSlice";
import { ReactComponent as GoodRequest } from "../../../../../assets/good_request.svg";
import { ReactComponent as BadRequest } from "../../../../../assets/bad_request.svg";
import { ReactComponent as MenuIcon } from "../../../../../assets/resize.svg";
import { RSKHooks } from "react-dev-starter-pack";
import classNames from "classnames";

type propsType = {
   request: requestType;
};
export const RequestHistoryItem: FC<propsType> = ({ request }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const menuRef = useRef(null);

   RSKHooks.useBlurred(menuRef, setIsMenuOpen, isMenuOpen);

   return (
      <button className={styles.container}>
         {request.success ? (
            <GoodRequest className={styles.status_icon} />
         ) : (
            <BadRequest className={styles.status_icon} />
         )}
         {request.action}
         <MenuIcon
            className={styles.menu_icon}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
         />
         {isMenuOpen && (
            <div ref={menuRef} className={styles.menu_container}>
               <button
                  className={classNames({
                     [styles.menu_button]: true,
                  })}
               >
                  Выполнить
               </button>
               <button
                  className={classNames({
                     [styles.menu_button]: true,
                  })}
               >
                  Скопировать
               </button>
               <div className={styles.line} />
               <button
                  className={classNames({
                     [styles.menu_button_delete]: true,

                     [styles.menu_button]: true,
                  })}
               >
                  Удалить
               </button>
            </div>
         )}
      </button>
   );
};
