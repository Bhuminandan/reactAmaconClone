import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        isDropdownOpen: false,
        isSideMenuOpen: false
    },
    reducers: {
        toggleDropdown: (state) => {
            state.isDropdownOpen = !state.isDropdownOpen;
        },
        toggleSideMenu: (state) => {
            state.isSideMenuOpen = !state.isSideMenuOpen;
        }
    }
})

export const { toggleDropdown, toggleSideMenu } = headerSlice.actions;
export default headerSlice.reducer;