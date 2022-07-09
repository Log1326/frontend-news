import {NavigateFunction} from "react-router-dom";

export interface IUser {
    firstName: string
    lastName: string
    phone: string
    email: string
    password: string
    confirmPassword?: string
    avatar: string
    _id: string
}

export interface IUsers {
    firstName: string
    lastName: string
    avatar: string
    _id: string
}

export interface IData {
    data: IUser
    token: string
}

export enum statusUser {
    loading = 'loading',
    loaded = 'completed',
    error = 'error'
}

export interface initialTypeState {
    user: IUser | null
    users: IUsers[]
    status: statusUser | null
    error: string | null
}

export interface IApi {
    formData: IUser
    navigate: NavigateFunction
    toast: any
}

export type KnownError = {
    error: string;
}