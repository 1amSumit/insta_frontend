import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./Fileupload";

export const store = configureStore({
  reducer: {
    fileupload: fileSlice.reducer,
  },
});
