import { createSlice, current } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        addToCard: (state, action) => {

            const itemId = action.payload.id;
            const isAdded = state.cartItems.find((item) => item.id === itemId)

            if (isAdded) {
                state.cartItems.map((item) => item.id === itemId ? item.quantity++ : item)
            } else {
                state.cartItems.push(action.payload);
            }

        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        increaseQuantity: (state, action) => {
            console.log('getting increase call');
            console.log(action.payload);
            console.log(current(state.cartItems));
            const itemId = action.payload;
            state.cartItems.map((item) => item.id === itemId ? item.quantity++ : item)
        },
        decreaseQuantity: (state, action) => {

            const itemId = action.payload;
            if (state.cartItems.find((item) => item.id === itemId).quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
            } else {
                state.cartItems.map((item) => item.id === itemId ? item.quantity-- : item)
            }
        }
    }
})

export const { addToCard, setCartItems, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;