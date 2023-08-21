// routeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countMapRoute: 0,
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    incrementCountMapRoute: (state) => {
      state.countMapRoute += 1;
    },
  },
});

export const { incrementCountMapRoute } = routeSlice.actions;

export default routeSlice.reducer;
