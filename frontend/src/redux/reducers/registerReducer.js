const initialState = {
  fetching: true,
  done: false,
  error: "",
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER_PENDING":
      return {
        ...state,
        fetching: true,
      };
    case "REGISTER_USER_DONE":
      return {
        ...state,
        fetching: false,
        done: true,
      };
    case "REGISTER_USER_ERROR":
      return {
        ...state,
        fetching: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default registerReducer;
