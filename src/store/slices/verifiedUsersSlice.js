import { createSlice } from "@reduxjs/toolkit";

const verifiedUsersSlice = createSlice({
  name: "verifiedUsers",
  initialState: {
    users: [],
  },

  reducers: {
    updateUserField: (state, action) => {
      const { id, field, value } = action.payload;
      state.users = state.users.map((u) =>
        u.id === id ? { ...u, [field]: value } : u
      );
    },
  },
});

export const { updateUserField } = verifiedUsersSlice.actions;
export default verifiedUsersSlice.reducer;
