import {createSlice} from "@reduxjs/toolkit";
import {initialTypeState, statusUser} from "./types";
import {get_all_users, get_current_user, getUserById, remove_user, sign_in, sign_up, update_user} from "./userAction";


const initialState: initialTypeState = {
    user: null,
    users: [],
    oneUser: null,
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
        setUser: (state, action) => {
            state.user = JSON.parse(action.payload)
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
                localStorage.setItem('user', JSON.stringify(action.payload.data))
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
                localStorage.setItem('user', JSON.stringify(action.payload.data))
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
                if (action.payload === '403' || '402') {
                    state.user = null
                    localStorage.clear()
                } else state.error = String(action.payload)
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
            .addCase(update_user.pending, (state) => {
                state.status = statusUser.loading
                state.error = null
            })
            .addCase(update_user.fulfilled, (state, action) => {
                state.status = statusUser.loaded
                localStorage.setItem('user', JSON.stringify(action.payload.data))
                localStorage.setItem('token', action.payload.token)
                state.user = action.payload.data
                state.error = null
            })
            .addCase(update_user.rejected, (state, action) => {
                state.status = statusUser.error
                state.error = String(action.payload)
            })
            .addCase(remove_user.pending, (state) => {
                state.status = statusUser.loading
                state.error = null
            })
            .addCase(remove_user.fulfilled, (state) => {
                state.status = statusUser.loaded
                state.user = null
                localStorage.clear()
                state.error = null
            })
            .addCase(remove_user.rejected, (state, action) => {
                state.status = statusUser.error
                state.error = String(action.payload)
            })
            .addCase(getUserById.pending, (state) => {
                state.status = statusUser.loading
                state.error = null
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.oneUser = action.payload
                state.status = statusUser.loaded
                state.error = state.error = null
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.status = statusUser.error
                state.error = String(action.payload)
            })
    }
})
export const {logout, setUser} = userSlice.actions
export default userSlice.reducer


