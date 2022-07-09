import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from '../../service/api'
import {IApi, IData, IUser, KnownError} from "./types";

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

export const get_current_user = createAsyncThunk<IUser, string, { rejectValue: KnownError }>(
    'user/get_current_user',
    async (token, {rejectWithValue}) => {
        try {
            const {data} = await api.get_current_user(token)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            console.log(err)
            return rejectWithValue(error)
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