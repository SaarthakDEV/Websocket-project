import { configureStore} from "@reduxjs/toolkit"
import authReducer from "../slice/authSlice"

const AuthStore = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default AuthStore;