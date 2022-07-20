import {RootState} from "../store";
import {createSelector} from "@reduxjs/toolkit";

export const selectorOneNewsById = (state: RootState) => state.news.oneNewsById
export const oneNewsById = createSelector(
    [selectorOneNewsById],
    (oneNewsById) => oneNewsById
)
export const selectorAllNews = (state: RootState) => state.news.allNews
export const allNews = createSelector(
    [selectorAllNews],
    (allNews) => allNews
)
export const selectorUserNewsById = (state: RootState) => state.news.userNewsById
export const newsByUserId = createSelector(
    [selectorUserNewsById],
    (userNewsById) => userNewsById
)
export const selectorOptions = (state: RootState) => state.news.options
export const optionsSelector = createSelector(
    [selectorOptions],
    (options) => options
)

export const selectorTags = (state: RootState) => state.news.tagsNews
export const tags = createSelector(
    [selectorTags],
    (tagsNews) => tagsNews
)
export const selectorTagsRelated = (state: RootState) => state.news.tagsRelatedNews
export const tagsRelated = createSelector(
    [selectorTagsRelated],
    (tagsRelatedNews) => tagsRelatedNews

)
export const selectorLikes = (state: RootState) => state.news.likes
export const likes = createSelector(
    [selectorLikes],
    (likes) => likes
)
export const selectorMyTags = (state: RootState) => state.news.myTags
export const myTags = createSelector(
    [selectorMyTags],
    (myTags) => myTags
)


