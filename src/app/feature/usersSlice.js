import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    setUsersData: (state, { payload }) => {
      state.users = payload;
    },
    addUser: (state, { payload }) => {
      state.users.push(payload);
    },
    deleteUserById: (state, { payload }) => {
      state.users = state.users.filter((item) => item.id !== payload);
    },
    editUser: (state, { payload }) => {
      state.users = state.users.map((user) => {
        if (user.id === payload[1]) {
          user.name = payload[0].name;
          user.email = payload[0].email;
          user.password = payload[0].password;
          user.confirmed = payload[0].confirmed;
          user.role = payload[0].role;
          user.blocked = payload[0].blocked;
        }
        return user;
      });
    },
  },
});

export const { setUsersData, addUser, deleteUserById, editUser } = usersSlice.actions;
export default usersSlice.reducer;
