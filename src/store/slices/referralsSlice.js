// src/store/slices/referralsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// ⭐ Load saved referrals from LocalStorage
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("referrals");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("LocalStorage Read Error", err);
    return [];
  }
};

// ⭐ Save referrals to LocalStorage
const saveToLocalStorage = (items) => {
  try {
    localStorage.setItem("referrals", JSON.stringify(items));
  } catch (err) {
    console.error("LocalStorage Save Error", err);
  }
};

const referralsSlice = createSlice({
  name: "referrals",
  initialState: {
    items: loadFromLocalStorage(), // ⭐ Load data on app start
    editingReferral: null,
  },

  reducers: {
    addReferral: (state, action) => {
      const newItem = { id: Date.now(), ...action.payload };
      state.items.push(newItem);

      saveToLocalStorage(state.items); // ⭐ Save to local storage
    },

    deleteReferral: (state, action) => {
      state.items = state.items.filter((r) => r.id !== action.payload);

     saveToLocalStorage(state.items);
 // ⭐ Save
    },

    startEditing: (state, action) => {
      state.editingReferral = action.payload;
    },

    saveEditedReferral: (state, action) => {
      const updated = action.payload;

      state.items = state.items.map((r) =>
        r.id === updated.id ? updated : r
      );

      state.editingReferral = null;

      saveToLocalStorage(state.items); // ⭐ Save
    },
  },
});

export const {
  addReferral,
  deleteReferral,
  startEditing,
  saveEditedReferral,
} = referralsSlice.actions;

export default referralsSlice.reducer;
