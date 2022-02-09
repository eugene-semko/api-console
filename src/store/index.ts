import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";

import { connectRouter, routerMiddleware } from "connected-react-router";
import { authSlice } from "./authSlice";
import { loadingSlice } from "./loadingSlice";
import { rootSaga } from "../sagas";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const reducer = combineReducers({
   router: connectRouter(history),
   authSlice: authSlice.reducer,
   loadingSlice: loadingSlice.reducer,
});

export const store = configureStore({
   reducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
         .concat(sagaMiddleware)
         .concat(routerMiddleware(history)),
});
sagaMiddleware.run(rootSaga);

export type StateType = ReturnType<typeof reducer>;
