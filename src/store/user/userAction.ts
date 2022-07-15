import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from '../../service/api'
import {IApi, IData, IFollower, IRemove, IUpdateUser, KnownError} from "./types";

export const sign_in = createAsyncThunk<IData, IApi, { rejectValue: KnownError }>(
    'user/sign_in',
    async ({formData, navigate, toast}, {rejectWithValue}) => {
        try {
            const {data} = await api.sign_in_api(formData)
            navigate('/')
            toast.success('login successfully')
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)


export const sign_up = createAsyncThunk<IData, IApi, { rejectValue: KnownError }>(
    'user/sign_Up',
    async ({formData, navigate, toast}, {rejectWithValue}) => {
        try {
            const {data} = await api.sign_up_api(formData)
            navigate('/')
            toast.success('register successfully')
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)


export const get_current_user = createAsyncThunk(
    'user/get_current_user',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await api.get_current_user()
            return data
        } catch (err: any) {
            if (err.response.status === 402 || 403) {
                return rejectWithValue(String(err.response.status))
            }
            return rejectWithValue(err)
        }
    })


export const get_all_users = createAsyncThunk(
    'user/get_all_users',
    async () => {
        try {
            const {data} = await api.getAllUsers()
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            console.log(error)
        }
    })

export const update_user = createAsyncThunk<IData, IUpdateUser, { rejectValue: KnownError }>(
    'user/update_user',
    async ({updateData, id, navigate, toast}, {rejectWithValue}) => {
        try {
            const {data} = await api.updateUser({updateData, id})
            navigate('/')
            toast.success('update done')
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)


export const remove_user = createAsyncThunk<string, IRemove, { rejectValue: KnownError }>(
    'user/remove_user',
    async ({id, navigate, toast}, {rejectWithValue}) => {
        try {
            if (id) {
                const {data} = await api.deleteUser(id)
                navigate('/')
                toast.success('remove profile successful')
                return data
            }
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)


export const follower_user = createAsyncThunk<string, IFollower, { rejectValue: KnownError }>(
    'user/follower_user',
    async ({id, navigate, toast}, {rejectWithValue}) => {
        try {
            const {data} = await api.follower(id)
            navigate('/')
            toast.success('following successful')
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)

