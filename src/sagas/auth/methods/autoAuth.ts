import { PayloadAction } from "@reduxjs/toolkit";
import { mainApiNamespace } from "../../../api/types";
import { processStateController } from "../../../helpers/processLoading";
import { mainApi } from "../../../api";
import { call, delay, put } from "redux-saga/effects";
import { sagaApiType } from "../../types";
import { authSlice } from "../../../store/authSlice";
import { push } from "connected-react-router";
import { routes } from "../../../routes";
import { lsController } from "../../../localStorage";
import { loginSaga } from "./login";
import { sagaActions } from "../../actions";

export function* autoAuth() {
   const actionType = sagaActions.auth.autoAuth.type;
   const process = processStateController(actionType);
   yield process?.start();
   yield delay(1000);

   try {
      const login = lsController.get("login");
      const sublogin = lsController.get("sublogin");
      const password = lsController.get("password");

      if (login && password) {
         yield call(loginSaga, {
            type: sagaActions.auth.login.type,
            payload: {
               login: login,
               sublogin: sublogin != null && sublogin ? sublogin : undefined,
               password: password,
            },
         });
      }
   } catch (e) {
      lsController.clearAll();
      yield put(push(routes.auth));
      yield put(authSlice.actions.setError(e));
   } finally {
      yield process?.stop();
   }
}
