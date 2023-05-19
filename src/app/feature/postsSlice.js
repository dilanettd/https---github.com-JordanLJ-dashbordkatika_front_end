import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    setpostsData: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts.push(payload);
    },
    deletePostById: (state, { payload }) => {
      state.posts = state.posts.filter((item) => item.id !== payload);
    },
    editPost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload[1]) {
          post.title = payload[0].title;
          post.summary = payload[0].summary;
          post.category = payload[0].category;
          post.content = payload[0].content;
          post.cover = payload[0].cover;
        }
        return post;
      });
    },
  },
});

export const { setpostsData, addPost, deletePostById, editPost } = postsSlice.actions;
export default postsSlice.reducer;
