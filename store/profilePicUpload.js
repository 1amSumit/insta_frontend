import { createSlice } from "@reduxjs/toolkit";

const profilePicUpload = createSlice({
  name: "profileUpload",
  initialState: {
    file: "",
  },
  reducers: {
    setFileName(state, action) {
      state.file = action.payload.formDataObject.file;
    },
    removeFileName(state) {
      state.file = "";
    },
  },
});

export const profilePicUploadActions = profilePicUpload.actions;

export default profilePicUpload;
