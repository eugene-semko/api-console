import { spawn } from "redux-saga/effects";
import { authWatcher } from "./auth";

export function* rootSaga() {
   yield spawn(authWatcher);
}
