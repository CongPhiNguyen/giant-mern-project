import { combineReducers } from "redux";
import sharedSlice from "../shared/sharedSlice";
import ModalSlice from "../shared/modals/ModalSlice";
const rootReducer = combineReducers({
  sharedSlice: sharedSlice,
  modalSlice: ModalSlice,
});
export default rootReducer;
