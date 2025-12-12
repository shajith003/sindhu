// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import referralsReducer from "./slices/referralsSlice";
import verifiedUsersReducer from "./slices/verifiedUsersSlice";
import productsReducer from "./slices/productsSlice";  // <-- add this import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    referrals: referralsReducer,
    verifiedUsers: verifiedUsersReducer,
    products: productsReducer,      // <-- register reducer
  },
});
