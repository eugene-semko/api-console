import { put } from "redux-saga/effects";
import { setProcessLoading } from "../store/loadingSlice";

export const processStateController = (actionType: string) => ({
   start: () => put(setProcessLoading(actionType, true)),
   stop: () => put(setProcessLoading(actionType, false)),
});
