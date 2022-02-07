import axios from "axios";

export const mainAxios = axios.create({
   baseURL: "https://api.sendsay.ru/general/api/v100/json",
});
class MainApiClass {}
export const mainApi = new MainApiClass();
