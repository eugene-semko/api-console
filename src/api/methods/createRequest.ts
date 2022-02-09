import { AxiosResponse } from "axios";

export const createRequest = async (request: any): Promise<AxiosResponse> => {
   try {
      return await request;
   } catch (e: any) {
      throw await e?.response;
   }
};
