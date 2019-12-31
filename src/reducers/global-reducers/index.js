import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { alert } from "./alert.reducer";

const globalReducer = combineReducers({
  authentication,
  alert
});

export default globalReducer;
