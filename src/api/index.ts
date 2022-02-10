import { mainApiNamespace } from "./types";
//@ts-ignore
import Sendsay from "sendsay-api";

export const sendsay = new Sendsay();
class MainApiClass {
   constructor() {}

   login = async (jsonPayload: mainApiNamespace.login) => {
      return await sendsay.request({
         action: "login",
         login: jsonPayload.login,
         sublogin: jsonPayload.sublogin,
         passwd: jsonPayload.password,
      });
   };
   logout = () => {
      sendsay.request({
         action: "logout",
      });
   };
   request = (payload: mainApiNamespace.requestPayloadType) => {
      return sendsay.request(payload);
   };
}
export const mainApi = new MainApiClass();
