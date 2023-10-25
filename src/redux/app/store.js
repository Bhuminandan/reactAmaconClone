import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/headerSlice";
import productsSlice from "../features/productsSlice";
import cartSlice from "../features/cartSlice";
import userSlice from "../features/userSlice";

const store = configureStore({
    reducer: {
        headerSlice: headerSlice,
        productsSlice: productsSlice,
        cartSlice: cartSlice,
        userSlice: userSlice,
    },
})

export default store;