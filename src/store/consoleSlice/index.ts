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
   isJsonInputError?: boolean;
   isResponseError?: boolean;
   currentRequest?: any;
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
      setCurrentRequest: (state, { payload }: PayloadAction<any>) => {
         state.currentRequest = payload;
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
            ) == -1
         ) {
            state.requestHistory.push(payload);
            if (state.requestHistory.length > 15) {
               state.requestHistory.shift();
            }
         }
      },
      removeRequestFromHistory: (
         state,
         { payload }: PayloadAction<requestType>
      ) => {
         state.requestHistory = [
            ...state.requestHistory.filter(
               (item) => JSON.stringify(item) != JSON.stringify(payload)
            ),
         ];
      },
      setJsonInputError: (state, { payload }: PayloadAction<boolean>) => {
         state.isJsonInputError = payload;
      },
      setIsResponseError: (state, { payload }: PayloadAction<boolean>) => {
         state.isResponseError = payload;
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
   isJsonInputError: (state: StateType) => state.consoleSlice.isJsonInputError,
   isResponseError: (state: StateType) => state.consoleSlice.isResponseError,
   currentRequest: (state: StateType) => state.consoleSlice.currentRequest,
};
