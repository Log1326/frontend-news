import {NavigateFunction} from "react-router-dom";
import {follower_user} from "./userAction";

export interface initialTypeState {
    user: IUser | null
    users: IUsers[]
    status: statusUser | null
    error: string | null
}

export enum statusUser {
    loading = 'loading',
    loaded = 'completed',
    error = 'error'
}

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

export interface IApi {
    formData: IUser
    navigate: NavigateFunction
    toast: any
}

export type KnownError = {
    error: string;
}

export interface IUpdateUser {
    updateData: IUser
    id: string
    navigate: NavigateFunction
    toast: any
}
export interface IUpdateData{
    updateData: IUser
    id: string
}
export interface IRemove{
    id: string | undefined
    navigate: NavigateFunction
    toast: any
}
export interface IFollower{
    id: string
    navigate: NavigateFunction
    toast: any
}