import {useLocation} from "react-router-dom";
import {IUsers} from "../store/user/types";
import {INews} from "../store/news/types";

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const excerpt = (str: string, count: number) => str.length > count && str.substring(0, count) + '...'

export const foundUser = (users: IUsers[], id: string) => {
    return users.find(user => user._id === id)
}

export const foundItem = (items: INews[], id: string | undefined) => {
    return items.find(item => item._id === id)
}
