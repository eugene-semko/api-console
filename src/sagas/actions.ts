import { createAction } from "@reduxjs/toolkit";
import { mainApiNamespace } from "../api/types";

export const sagaActions = {
   auth: {
      login: createAction<mainApiNamespace.login>("auth/login"),
   },
};
