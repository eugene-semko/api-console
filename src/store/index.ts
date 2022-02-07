import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";

import { connectRouter, routerMiddleware } from "connected-react-router";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const reducer = combineReducers({
   router: connectRouter(history),
});

export const store = configureStore({
   reducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
         .concat(sagaMiddleware)
         .concat(routerMiddleware(history)),
});

export type StateType = ReturnType<typeof reducer>;
