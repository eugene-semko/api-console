import { spawn } from "redux-saga/effects";
import { authWatcher } from "./auth";
import { autoAuth } from "./auth/methods/autoAuth";
import { consoleWatcher } from "./console";

export function* rootSaga() {
   yield spawn(authWatcher);
   yield spawn(autoAuth);
   yield spawn(consoleWatcher);
}
