import { takeEvery } from "redux-saga/effects";
import { sagaActions } from "../actions";
import { createRequestSaga } from "./createRequestSaga";

export function* consoleWatcher() {
   yield takeEvery(sagaActions.console.createRequest, createRequestSaga);
}
