// src/store/slices/productsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import productsData from "../../data/products.json";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: productsData,     // initial fallback
    editingProduct: null,
    searchTerm: "",
  },

  reducers: {
    // DELETE
    deleteProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },

    // START EDIT
    startEditingProduct: (state, action) => {
      state.editingProduct = action.payload;
    },

    // SAVE EDITED PRODUCT (Redux only)
    saveEditedProduct: (state, action) => {
      const updated = action.payload;

      state.items = state.items.map((p) =>
        p.id === updated.id ? updated : p
      );

      state.editingProduct = null;
    },

    // ADD NEW PRODUCT (Redux only)
    addNewProduct: (state, action) => {
      state.items.push(action.payload);
    },

    // SEARCH
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    // SORTING
    sortProducts: (state) => {
      state.items.sort((a, b) => a.breed.localeCompare(b.breed));
    },

    // UPDATE IMAGES ONLY
    updateProductImages: (state, action) => {
      const { id, images } = action.payload;
      const product = state.items.find((p) => p.id === id);
      if (product) {
        product.images = images;
      }
    },

    // ⭐ NEW — Replace ALL products (used after API calls)
    setAllProducts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  deleteProduct,
  startEditingProduct,
  saveEditedProduct,
  addNewProduct,
  setSearchTerm,
  sortProducts,
  updateProductImages,
  setAllProducts,   // ⭐ Export this (VERY IMPORTANT)
} = productsSlice.actions;

export default productsSlice.reducer;
