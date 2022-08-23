import { combineReducers } from "redux";
import sharedSlice from "../shared/sharedSlice";
import ModalSlice from "../shared/modals/ModalSlice";
import imageSlice from "../album/imageSlice";

const rootReducer = combineReducers({
  sharedSlice: sharedSlice,
  modalSlice: ModalSlice,
  imageSlice: imageSlice,
});
export default rootReducer;
