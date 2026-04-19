import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./chartSlice.ts"

const store = configureStore({
    reducer: {
        chart: chartReducer
    }
})

export default store;