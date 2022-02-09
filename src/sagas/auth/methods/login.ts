import { PayloadAction } from "@reduxjs/toolkit";
import { mainApiNamespace } from "../../../api/types";
import { processStateController } from "../../../helpers/processLoading";
import { mainApi } from "../../../api";
import { call, put } from "redux-saga/effects";
import { sagaApiType } from "../../types";
import { authSlice } from "../../../store/authSlice";
import { push } from "connected-react-router";
import { routes } from "../../../routes";

export function* loginSaga(action: PayloadAction<mainApiNamespace.login>) {
   const { payload, type: actionType } = action;
   const process = processStateController(actionType);
   yield put(authSlice.actions.reset());
   try {
      yield process?.start();
      const response: sagaApiType = yield call(mainApi.login, payload);
      yield put(authSlice.actions.setResponse(response));
      yield put(push(routes.console));
   } catch (e) {
      yield put(authSlice.actions.setError(e));
   } finally {
      yield process?.stop();
   }
}
