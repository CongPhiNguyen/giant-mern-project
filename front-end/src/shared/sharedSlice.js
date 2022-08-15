import { createSlice } from "@reduxjs/toolkit";

const sharedSlice = createSlice({
  name: "sharedSlice",
  initialState: {
    currentUser: {},
    currentUserInformation: {},
  },
  reducers: {
    setCurrentUser: (state, action) => {
      // console.log("action.payload", action.payload);
      state.currentUser = action.payload;
    },
    setCurrentUserInformation: (state, action) => {
      state.currentUserInformation = action.payload;
    },
  },
});

export const { setCurrentUser, setCurrentUserInformation } =
  sharedSlice.actions;

export default sharedSlice.reducer;
