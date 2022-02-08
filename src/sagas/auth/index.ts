import { takeEvery } from "redux-saga/effects";
import { sagaActions } from "../actions";
import { loginSaga } from "./methods/login";

export function* authWatcher() {
   yield takeEvery(sagaActions.auth.login, loginSaga);
}
