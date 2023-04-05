// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const loggedInSlice = createSlice({
  name: "loggedIn",
  initialState: {
    userInformation: [],
    userDetails: [],
    userProfile: [],
    userSpecialData: [],
    isUserAuthor: false,
    passwordResetState: "",
  },
  reducers: {
    getAuthData(state, action: any) {
      state.userInformation = [];
      state.userInformation.push(action.payload);
    },
    logOut(state) {
      state.userInformation = [];
      state.userDetails = [];
      state.userProfile = [];
      state.userSpecialData = [];
      state.passwordResetState = "";
    },
    getUserDetails(state, action) {
      state.userDetails = [];
      state.userDetails.push(action.payload);
    },
    getUserProfile(state, action) {
      state.userProfile = [];
      state.userProfile.push(action.payload);
    },
    isCurrentUserAuthor(state, action: any) {
      state.isUserAuthor = action.payload;
    },
    getUserSpecialData(state, action) {
      state.userSpecialData = [];
      state.userSpecialData.push(action.payload);
    },
    passwordReset(state, action) {
      state.passwordResetState = action.payload;
    },
  },
});

export const {
  getAuthData,
  getUserDetails,
  passwordReset,
  getUserProfile,
  getUserSpecialData,
  isCurrentUserAuthor,
  logOut,
} = loggedInSlice.actions;
export default loggedInSlice.reducer;
