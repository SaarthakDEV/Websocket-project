import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    id: null,
    name: "",
    socketId: [],
    isLoggedIn: false,
    token: "",
    tokenExpiry: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = !!action.payload.token;
            state.token = action.payload.token
        },
        setUser: (state, { payload: { id, name, socketId, token}}) => {
            state.id = id;
            state.name = name;
            if(socketId?.length > 0){
                state.socketId.push(socketId)
            }else{
                state.socketId = []
            }
            state.isLoggedIn = true
            state.token = token
        }
    }
})

export default authSlice.reducer;
export const authActions = authSlice.actions;