const initialState = {
  token: null,
  user: {},
  authenticate: false,
  authenticating: false,
  error: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER_PENDING":
      return {
        ...state,
        authenticating: true,
      };
    case "LOGIN_USER_DONE":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        authenticate: true,
        authenticating: false,
      };
    case "LOGIN_USER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default loginReducer;
