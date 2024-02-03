import { createSlice } from "@reduxjs/toolkit";

export const LikeSlice = createSlice({
  name: "like",
  initialState: {
    likeInfo: [],
  },
  reducers: {
    setLike: (state, action) => {
      const newLike = action.payload;
      const likeExisting = state.likeInfo.find(
        (like) => like.postId === newLike.postId
      );

      if (!likeExisting) {
        state.likeInfo.push({
          hasLiked: true,
          postId: newLike.postId,
        });
      }
    },
    disLike: (state, action) => {
      const postId = action.payload.postId;
      console.log(postId);
      const indexToRemove = state.likeInfo.findIndex(
        (like) => like.postId === postId
      );

      if (indexToRemove !== -1) {
        state.likeInfo.splice(indexToRemove, 1);
      }

      console.log(state);
    },
  },
});

export const LikeAction = LikeSlice.actions;

export default LikeSlice;
