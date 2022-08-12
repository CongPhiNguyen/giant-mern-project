import { createSlice } from "@reduxjs/toolkit";

const sharedSlice = createSlice({
  name: "sharedSlice",
  initialState: {
    currentUser: {},
  },
  reducers: {
    setCurrentUser: (state, action) => {
      console.log("action.payload", action.payload);
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = sharedSlice.actions;

export default sharedSlice.reducer;
