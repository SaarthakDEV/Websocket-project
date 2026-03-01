import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./chartSlice.ts"

const store = configureStore({
    reducer: {
        // auth : authReducer,
        chart: chartReducer
    }
})

export default store;