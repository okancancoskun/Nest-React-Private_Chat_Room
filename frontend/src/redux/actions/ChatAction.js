import axios from "../../helpers/axios";

export class ChatAction {
  static getRoom(receiver) {
    return async (dispatch) => {
      try {
        const res = await axios.get(`http://localhost:5000/room/create/${receiver}`);
        dispatch({
          type: "GET_ROOM_PENDING",
        });
        dispatch({
          type: "GET_ROOM_DONE",
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: "GET_ROOM_ERROR",
          payload: error,
        });
      }
    };
  }

  static afterPostMessage(data) {
    return {
      type: "AFTER_POST_MESSAGE",
      payload: data,
    };
  }
}
