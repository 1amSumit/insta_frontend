import { createSlice } from "@reduxjs/toolkit";

export const saveLiketoLocalStorage = (likeInfo) => {
  const setLikes = JSON.stringify(likeInfo);
  localStorage.setItem("likes", setLikes);
};

export const loadLikeFormLocalStorage = () => {
  const likes = localStorage.getItem("likes");

  if (likes === null) {
    return [];
  }

  return JSON.parse(likes);
};

export const LikeSlice = createSlice({
  name: "like",
  initialState: {
    likeInfo: loadLikeFormLocalStorage(),
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

        saveLiketoLocalStorage(state.likeInfo);
      }
    },
    disLike: (state, action) => {
      const postId = action.payload.postId;

      const indexToRemove = state.likeInfo.findIndex(
        (like) => like.postId === postId
      );

      if (indexToRemove !== -1) {
        state.likeInfo.splice(indexToRemove, 1);
        saveLiketoLocalStorage(state.likeInfo);
      }
    },
  },
});

export const LikeAction = LikeSlice.actions;

export default LikeSlice;
