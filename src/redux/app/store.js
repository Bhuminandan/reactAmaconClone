import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/headerSlice";
import productsSlice from "../features/productsSlice";


const store = configureStore({
    reducer: {
        headerSlice: headerSlice,
        productsSlice: productsSlice
    },
})

export default store;