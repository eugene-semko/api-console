import axios from "axios";
import { createRequest } from "./methods/createRequest";
import { mainApiNamespace } from "./types";
//@ts-ignore
import Sendsay from "sendsay-api";

export const mainAxios = axios.create({
   baseURL: "https://api.sendsay.ru/general/api/v100/json",
});
const sendsay = new Sendsay();
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
}
export const mainApi = new MainApiClass();
