import {createSlice} from "@reduxjs/toolkit";

export const modal = createSlice({
    name: 'modal',
    initialState: {
        show: false,
        component: null
    },
    reducers: {
        show: (state, action) => {
            state.show = true;
            state.component = action.payload;
        },
        close: (state, action) => {
            state.show = false;
            state.component = null;
        }
    }
});

export const {show, close} = modal.actions;

export default modal.reducer;