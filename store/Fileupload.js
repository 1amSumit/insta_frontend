import { createSlice } from "@reduxjs/toolkit";

export const fileSlice = createSlice({
  name: "fileupload",
  initialState: {
    file: "",
  },
  reducers: {
    setFileName(state, action) {
      state.file = action.payload.formDataObject.file;
    },
    clearFile(state) {
      state.file = "";
    },
  },
});

export const fileActions = fileSlice.actions;

export default fileSlice;
