import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "../reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

const allEnhancers = compose(applyMiddleware(thunk, logger));

export const store = createStore(rootReducer, allEnhancers);
