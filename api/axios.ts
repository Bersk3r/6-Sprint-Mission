import Cookies from "js-cookie";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
});

// instance.interceptors.request.use(
//   (config) => {
//     const accessToken = Cookies.get("accessToken");

//     try {
//       if (accessToken) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }
//       return config;
//     } catch (err) {
//       throw new Error("잘못된 요청을 보냈습니다.");
//       // console.error("[_axios.interceptors.request] config : " + err.message);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;
