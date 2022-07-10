import {RootState} from "../store";

export const selectorAllUsers = (state: RootState) => state.user.users
export const selectorUser = (state: RootState) => state.user