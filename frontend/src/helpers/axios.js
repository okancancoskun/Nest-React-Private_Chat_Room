import axios from "axios";
import { store } from "./store";

const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

/* axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
      store.dispatch({
        type: "LOGOUT_USER_DONE",
      });
    }
    return new Promise.reject(error);
  }
); */

export default axiosInstance;
