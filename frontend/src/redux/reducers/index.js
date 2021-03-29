import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import roomReducer from "./roomReducer";

export const rootReducer = combineReducers({
  auth: loginReducer,
  newUser: registerReducer,
  room: roomReducer,
});
