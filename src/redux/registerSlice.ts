import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "registerStatus",
  initialState: {
    registerStateusState: "",
    username: "",
    password: "",
    becomeAuthor: false,
    userInformation: [],
  },
  reducers: {
    getRegisterStatus(state, action: any) {
      state.registerStateusState = action.payload;
    },
    getUserName(state, action: any) {
      state.username = action.payload;
    },
    getUserPassword(state, action: any) {
      state.password = action.payload;
    },
    getBecomeAuthor(state, action: any) {
      state.becomeAuthor = action.payload;
    },
  },
});

export const {
  getRegisterStatus,
  getUserName,
  getUserPassword,
  getBecomeAuthor,
} = registerSlice.actions;
export default registerSlice.reducer;
