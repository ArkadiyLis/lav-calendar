import {configureStore} from "@reduxjs/toolkit";
import modalReducer from "../components/Modal/reducer";
import plannerReducer from '../components/Planner/reducer';
export default configureStore({
    reducer: {
        modal: modalReducer,
        planner: plannerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});