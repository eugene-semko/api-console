import { spawn } from "redux-saga/effects";
import { authWatcher } from "./auth";
import { autoAuth } from "./auth/methods/autoAuth";

export function* rootSaga() {
   yield spawn(authWatcher);
   yield spawn(autoAuth);
}
