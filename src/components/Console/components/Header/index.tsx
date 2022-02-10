import React, { FC } from "react";
import styles from "./index.module.css";
import { ReactComponent as LogoIcon } from "../../../../assets/LOGO.svg";
import { lsController } from "../../../../localStorage";
import { ReactComponent as LogoutIcon } from "../../../../assets/log-out.svg";
import { ReactComponent as FullscreenIcon } from "../../../../assets/fullscreen.svg";
import { useDispatch } from "react-redux";
import { ReactComponent as ExitFullscreen } from "../../../../assets/exit_fullscreen.svg";

import { authSlice } from "../../../../store/authSlice";
import { useHistory } from "react-router-dom";
import { routes } from "../../../../routes";
import { mainApi, sendsay } from "../../../../api";
import { FullScreenHandle } from "react-full-screen";
import { consoleSlice } from "../../../../store/consoleSlice";

type propsType = {
   fullscreenHandle: FullScreenHandle;
};
export const Header: FC<propsType> = (props) => {
   const dispatch = useDispatch();
   const history = useHistory();

   const login = lsController.get("login");
   const sublogin = lsController.get("sublogin");

   const logout = () => {
      mainApi.logout();
      lsController.clearAll();
      sendsay.setSession("");
      dispatch(authSlice.actions.reset());
      dispatch(consoleSlice.actions.reset());
      history.push(routes.auth);
   };
   return (
      <div className={styles.container}>
         <div className={styles.left}>
            <LogoIcon className={styles.logo} />
            <div className={styles.title}>API-консолька</div>
         </div>
         <div className={styles.right}>
            <div className={styles.acc_info}>
               <div className={styles.acc_info_title}>
                  {login}
                  {sublogin ? (
                     <>
                        <span className={styles.dots}> : </span>
                        {sublogin}
                     </>
                  ) : (
                     ""
                  )}
               </div>
            </div>
            <button className={styles.logout_button} onClick={logout}>
               Выйти <LogoutIcon className={styles.logout_icon} />
            </button>
            <button
               onClick={
                  props.fullscreenHandle.active
                     ? props.fullscreenHandle.exit
                     : props.fullscreenHandle.enter
               }
               className={styles.fullscreen_button}
            >
               {props.fullscreenHandle.active ? (
                  <ExitFullscreen />
               ) : (
                  <FullscreenIcon />
               )}
            </button>
         </div>
      </div>
   );
};
