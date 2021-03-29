import axios from "../../helpers/axios";
export class UserAction {
  static postLogin(data = {}) {
    return async (dispatch) => {
      const res = await axios.post("http://localhost:5000/user/login", { ...data });
      dispatch({ type: "LOGIN_USER_PENDING" });
      if (res.status === 201) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: "LOGIN_USER_DONE",
          payload: { token, user },
        });
      } else {
        dispatch({ type: "LOGIN_USER_ERROR", payload: res.data });
      }
    };
  }

  static postRegister(newUser = {}) {
    return async (dispatch) => {
      const res = await axios.post("http://localhost:5000/user/register", { ...newUser });
      dispatch({ type: "REGISTER_USER_PENDING" });

      if (res.status === 201) {
        dispatch({
          type: "REGISTER_USER_DONE",
          paylaod: res.data,
        });
      } else {
        dispatch({
          type: "REGISTER_USER_ERROR",
          payload: res.data,
        });
      }
    };
  }
}
