import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/headerSlice";


const store = configureStore({
    reducer: {
        headerSlice: headerSlice,
    },
})

export default store;