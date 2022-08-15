import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "ModalSlice",
  initialState: {
    modalName: "",
    modalDisplay: false,
  },
  reducers: {
    showModal: (state, action) => {
      // console.log("action.payload", action.payload);
      state.modalName = action.payload;
      state.modalDisplay = true;
    },
    hideModal: (state, action) => {
      state.modalName = "";
      state.modalDisplay = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
