import { combineReducers } from "redux";
import sharedSlice from "../shared/sharedSlice";
const rootReducer = combineReducers({
  sharedSlice: sharedSlice,
});
export default rootReducer;
