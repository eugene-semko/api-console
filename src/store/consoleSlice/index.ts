import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "../index";

export type requestType = {
   action: string;
   resendAction: {
      [key: string]: any;
   };
   success?: boolean;
};
type initialStateType = {
   currentResponse?: any;
   requestHistory: Array<requestType>;
};

const initialState: initialStateType = {
   requestHistory: [],
};

export const consoleSlice = createSlice({
   name: "consoleSlice",
   initialState: initialState,
   reducers: {
      setCurrentResponse: (state, { payload }: PayloadAction<any>) => {
         state.currentResponse = payload;
      },
      setRequestHistory: (
         state,
         { payload }: PayloadAction<Array<requestType>>
      ) => {
         state.requestHistory = [...payload];
      },
      addRequestToHistory: (state, { payload }: PayloadAction<requestType>) => {
         if (
            state.requestHistory.findIndex(
               (item) => JSON.stringify(item) == JSON.stringify(payload)
            )
         ) {
            state.requestHistory.push(payload);
         }
      },
      resetRequestHistory: (state) => {
         state.requestHistory = [];
      },
      reset: () => initialState,
   },
});
export const consoleSliceSelectors = {
   currentResponse: (state: StateType) => state.consoleSlice.currentResponse,
   requestHistory: (state: StateType) => state.consoleSlice.requestHistory,
};
