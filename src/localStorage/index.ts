import { builders } from "react-dev-starter-pack";

export const lsController = builders.localStorage<{
   session?: string;
   login?: string;
   sublogin?: string;
   password?: string;
}>();
