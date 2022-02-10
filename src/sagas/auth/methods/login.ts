import { PayloadAction } from "@reduxjs/toolkit";
import { mainApiNamespace } from "../../../api/types";
import { processStateController } from "../../../helpers/processLoading";
import { mainApi } from "../../../api";
import { call, put } from "redux-saga/effects";
import { sagaApiType } from "../../types";
import { authSlice } from "../../../store/authSlice";
import { push } from "connected-react-router";
import { routes } from "../../../routes";
import { lsController } from "../../../localStorage";

export function* loginSaga(action: PayloadAction<mainApiNamespace.login>) {
   const { payload, type: actionType } = action;
   const process = processStateController(actionType);
   yield put(authSlice.actions.reset());
   try {
      yield process?.start();
      const response: {
         login: string;
         session: string;
         sublogin: string;
      } = yield call(mainApi.login, payload);
      yield put(authSlice.actions.setResponse(response));
      lsController.set("login", payload.login);
      lsController.set("sublogin", payload.sublogin);
      lsController.set("password", payload.password);

      yield put(push(routes.console));
   } catch (e) {
      yield put(authSlice.actions.setError(e));
   } finally {
      yield process?.stop();
   }
}
