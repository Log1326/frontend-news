import {createSlice} from "@reduxjs/toolkit";
import {initialTypeState, statusUser} from "./types";
import {get_all_users, get_current_user, sign_in, sign_up} from "./userAction";


const initialState: initialTypeState = {
    user: null,
    users: [],
    status: null,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear()
            state.user = null
        },

    },
    extraReducers: builder => {
        builder
            .addCase(sign_in.pending, (state) => {
                state.status = statusUser.loading
                state.error = null
            })
            .addCase(sign_in.fulfilled, (state, action) => {
                state.user = action.payload.data
                localStorage.setItem('token', action.payload.token)
                state.status = statusUser.loaded
                state.error = null
            })
            .addCase(sign_in.rejected, (state, action) => {
                state.status = statusUser.error
                state.error = String(action.payload)
            })
            .addCase(sign_up.pending, (state) => {
                state.status = statusUser.loading
                state.error = null
            })
            .addCase(sign_up.fulfilled, (state, action) => {
                state.user = action.payload.data
                localStorage.setItem('token', action.payload.token)
                state.status = statusUser.loaded
                state.error = null
            })
            .addCase(sign_up.rejected, (state, action) => {
                state.status = statusUser.error
                state.error = String(action.payload)
            })
            .addCase(get_current_user.pending, (state) => {
                state.status = statusUser.loading
                state.error = null
            })
            .addCase(get_current_user.fulfilled, (state, action) => {
                state.status = statusUser.loaded
                state.user = action.payload
                state.error = null
            })
            .addCase(get_current_user.rejected, (state, action) => {
                state.status = statusUser.error
                state.error = String(action.payload)
                state.user = null
                localStorage.clear()
            })
            .addCase(get_all_users.pending, (state) => {
                state.status = statusUser.loading
                state.error = null
            })
            .addCase(get_all_users.fulfilled, (state, action) => {
                state.status = statusUser.loaded
                state.users = action.payload
                state.error = null
            })
            .addCase(get_all_users.rejected, (state, action) => {
                state.status = statusUser.error
                state.error = String(action.payload)
            })
    }
})

export const {logout} = userSlice.actions
export default userSlice.reducer


