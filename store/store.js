import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./Fileupload";
import LikeSlice from "./Like";
import profilePicUpload from "./profilePicUpload";

export const store = configureStore({
  reducer: {
    fileupload: fileSlice.reducer,
    like: LikeSlice.reducer,
    profileUpload: profilePicUpload.reducer,
  },
});
