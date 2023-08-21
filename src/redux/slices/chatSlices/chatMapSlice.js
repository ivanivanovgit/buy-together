// chatMapSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputText: "",
  inputGroupText: "",
  address: "",
  createMarker: 0,
  selectedTheme: "",
  isMarkerPlaced: false,
  searchButtonClick: "",
  searchInput: "",
  showAllMarkers: false,
  markersMesage: "",
  openAlert: false,
  showMessage: "",
  isAddingMarker: false,
};

export const chatMapSlice = createSlice({
  name: "chatMap",
  initialState,
  reducers: {
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },
    setInputGroupText: (state, action) => {
      state.inputGroupText = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    incrementCountAddMarker: (state) => {
      state.createMarker += 1;
    },
    setSelectedTheme: (state, action) => {
      state.selectedTheme = action.payload;
    },
    setIsMarkerPlaced: (state, action) => {
      state.isMarkerPlaced = action.payload;
    },
    setSearchButtonClick: (state, action) => {
      state.searchButtonClick = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setShowAllMarkers: (state, action) => {
      state.showAllMarkers = action.payload;
    },
    setMarkersMesage: (state, action) => {
      state.markersMesage = action.payload;
    },
    setOpenAlert: (state, action) => {
      state.openAlert = action.payload;
    },
    setShowMessage: (state, action) => {
      state.showMessage = action.payload;
    },
    setIsAddingMarker: (state, action) => {
      state.showMessage = action.payload;
    },
  },
});

export const {
  setInputText,
  setInputGroupText,
  setAddress,
  incrementCountAddMarker,
  setSelectedTheme,
  setIsMarkerPlaced,
  setSearchButtonClick,
  setSearchInput,
  setShowAllMarkers,
  setMarkersMesage,
  setOpenAlert,
  setShowMessage,
  setIsAddingMarker,
} = chatMapSlice.actions;

export default chatMapSlice.reducer;
