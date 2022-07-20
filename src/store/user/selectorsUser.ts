import {RootState} from "../store";
import {createSelector} from "@reduxjs/toolkit";

export const selectorAllOptionsUser = (state: RootState) => state.user

export const selectorUser = (state: RootState) => state.user.user
//redux dynamic modules
export const user = createSelector(
    [selectorUser],
    (user) => user
)

export const selectorUsers = (state: RootState) => state.user.users
export const users = createSelector(
    [selectorUsers],
    (users) => users
)

export const selectorOneUser = (state: RootState) => state.user.oneUser
export const oneUser = createSelector(
    [selectorOneUser],
    (oneUser) => oneUser
)

