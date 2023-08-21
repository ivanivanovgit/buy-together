// messageSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  submit: "",
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setSubmitMessage: (state, action) => {
      state.submit = action.payload;
    },
  },
});

export const { setErrorMessage, setSubmitMessage } = messageSlice.actions;

export const selectErrorMessage = (state) => state.messages.error;
export const selectSubmitMessage = (state) => state.messages.submit;

export default messageSlice.reducer;
