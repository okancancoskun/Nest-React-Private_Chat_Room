const initialState = {
  fetching: false,
  fetched: true,
  room: {},
  messages: [],
  error: {},
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ROOM_PENDING":
      return {
        ...state,
        fetching: true,
      };

    case "GET_ROOM_DONE":
      return {
        ...state,
        fetching: false,
        fetched: true,
        room: action.payload,
        messages: action.payload.messages,
      };
    case "GET_ROOM_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "AFTER_POST_MESSAGE":
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    default:
      return state;
  }
};

export default roomReducer;
