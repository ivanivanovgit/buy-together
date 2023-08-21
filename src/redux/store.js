// store.js
import { configureStore } from "@reduxjs/toolkit";
import countRouteReducer from "./slices/routeSlices/routeSlice";
import messageReducer from "./slices/routeSlices/messageSlice";
import chatMapReducer from "./slices/chatSlices/chatMapSlice";
export const store = configureStore({
  reducer: {
    routeCount: countRouteReducer,
    messages: messageReducer,
    chatMap: chatMapReducer,
  },
});

export default store;
