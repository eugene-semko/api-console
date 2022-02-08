import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sagaActions } from "../../sagas/actions";
import { StateType } from "../index";

const initialState: {
   [key: string]: boolean;
} = (function () {
   let temp: any = {};
   let groupKey: keyof typeof sagaActions;
   for (groupKey in sagaActions) {
      const group = sagaActions[groupKey];
      let actionKey: keyof typeof group;
      // @ts-ignore
      for (actionKey in group) {
         // @ts-ignore
         temp[`${group[actionKey].type}`] = false;
      }
   }
   return temp;
})();

export const loadingSlice = createSlice({
   name: "loadingSlice",
   initialState,
   reducers: {
      set: (
         state,
         {
            payload,
         }: PayloadAction<{
            key: string;
            value: boolean;
         }>
      ) => {
         state[payload.key] = payload.value;
      },
      clear: () => {},
   },
});

export const processLoading = {
   get: (key: string) => (state: StateType) => {
      return state.loadingSlice?.[key];
   },
};

export const setProcessLoading = (key: string, value: boolean) => {
   return loadingSlice.actions.set({
      key,
      value,
   });
};
