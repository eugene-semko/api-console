import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "../index";

type initialStateType = {
   goodResponse?: {
      login?: string;
      sublogin?: string;
      session?: string;
   };
   error?: any;
};

const initialState: initialStateType = {};

export const authSlice = createSlice({
   name: "authSlice",
   initialState: initialState,
   reducers: {
      setResponse: (state, { payload }: PayloadAction<any>) => {
         state.goodResponse = payload;
      },
      setError: (state, { payload }: PayloadAction<any>) => {
         state.error = payload;
      },
      reset: (state) => initialState,
   },
});
export const authSliceSelectors = {
   goodResponse: (state: StateType) => state.authSlice.goodResponse,
   error: (state: StateType) => state.authSlice.error,
};
