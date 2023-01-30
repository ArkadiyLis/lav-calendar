import {configureStore} from "@reduxjs/toolkit";
import modalReducer from "../components/Modal/reducer";

export default configureStore({
    reducer: {
        modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});