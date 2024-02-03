import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./Fileupload";
import LikeSlice from "./Like";

export const store = configureStore({
  reducer: {
    fileupload: fileSlice.reducer,
    like: LikeSlice.reducer,
  },
});
