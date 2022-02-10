import { createAction } from "@reduxjs/toolkit";
import { mainApiNamespace } from "../api/types";

export const sagaActions = {
   auth: {
      autoAuth: createAction("auth/autoAuth"),
      login: createAction<mainApiNamespace.login>("auth/login"),
   },
};
