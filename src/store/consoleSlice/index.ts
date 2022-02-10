import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "../index";

type initialStateType = {
   currentResponse?: any;
   requestHistory?: Array<any>;
};

const initialState: initialStateType = {};

export const consoleSlice = createSlice({
   name: "consoleSlice",
   initialState: initialState,
   reducers: {
      setCurrentResponse: (state, { payload }: PayloadAction<any>) => {
         state.currentResponse = payload;
      },
      reset: () => initialState,
   },
});
export const consoleSliceSelectors = {
   currentResponse: (state: StateType) => state.consoleSlice.currentResponse,
};
