import { PayloadAction } from "@reduxjs/toolkit";
import { processStateController } from "../../helpers/processLoading";
import { mainApiNamespace } from "../../api/types";
import { mainApi } from "../../api";
import { consoleSlice, consoleSliceSelectors } from "../../store/consoleSlice";
import { call, delay, put } from "redux-saga/effects";

export function* createRequestSaga(action: PayloadAction<string>) {
   const { payload, type: actionType } = action;
   const process = processStateController(actionType);
   try {
      JSON.parse(payload);
      try {
         yield process?.start();
         yield put(consoleSlice.actions.setIsResponseError(false));

         const request = JSON.parse(payload);
         const response: {
            [key: string]: any;
         } = yield call(mainApi.request, request);

         yield put(
            consoleSlice.actions.setCurrentResponse(
               JSON.stringify(response, null, 2)
            )
         );
         yield put(
            consoleSlice.actions.addRequestToHistory({
               action: request.action,
               resendAction: request,
               success: true,
            })
         );
      } catch (e: any) {
         const request = JSON.parse(payload);
         if (
            e.id != "access_denied" &&
            e.id != "error/api/unknownaction" &&
            request.action
         ) {
            yield put(
               consoleSlice.actions.addRequestToHistory({
                  action: request.action,
                  resendAction: request,
                  success: false,
               })
            );
         }
         yield put(consoleSlice.actions.setIsResponseError(true));
         yield put(
            consoleSlice.actions.setCurrentResponse(JSON.stringify(e, null, 2))
         );
      }
   } catch (e) {
      yield put(consoleSlice.actions.setJsonInputError(true));
   } finally {
      yield delay(600);
      yield process?.stop();
   }
}
