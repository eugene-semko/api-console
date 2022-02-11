import { builders } from "react-dev-starter-pack";
import { requestType } from "../store/consoleSlice";

export const lsController = builders.localStorage<{
   session?: string;
   login?: string;
   sublogin?: string;
   password?: string;
   size?: {
      left: number;
      right: number;
   };
   history: Array<requestType>;
}>();
