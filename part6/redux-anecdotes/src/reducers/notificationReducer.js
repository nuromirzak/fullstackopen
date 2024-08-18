import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
  },
});

const { setNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;

export const setNotificationAction = (message) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
  };
};
