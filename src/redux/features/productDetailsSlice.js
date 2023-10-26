import { createSlice } from "@reduxjs/toolkit";


const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: {
        currentProduct: null
    },
    reducers: {
        setProductDetails: (state, action) => {
            state.currentProduct = action.payload;
        }
    }
})

export const { setProductDetails } = productDetailsSlice.actions;
export default productDetailsSlice.reducer