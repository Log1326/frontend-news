import {RootState} from "../store";

export const selectorOneNewsById = (state: RootState) => state.news.oneNewsById
export const selectorAllNews = (state: RootState) => state.news.allNews
export const selectorUserNewsById = (state: RootState) => state.news.userNewsById
export const selectorOptions = (state: RootState) => state.news.options
export const selectorTags = (state: RootState) => state.news.tagsNews
export const selectorTagsRelated = (state: RootState) => state.news.tagsRelatedNews