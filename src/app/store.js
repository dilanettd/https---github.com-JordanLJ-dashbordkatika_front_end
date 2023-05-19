import { configureStore } from "@reduxjs/toolkit";
import gpssReducer from "./feature/gpssSlice";
import postsReducer from "./feature/postsSlice";
import proformasReducer from "./feature/proformasSlice";
import usersReducer from "./feature/usersSlice";

export default configureStore({
  reducer: {
    gpss: gpssReducer,
    posts: postsReducer,
    proformas: proformasReducer,
    users: usersReducer,
  },
});
