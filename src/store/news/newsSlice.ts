import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {newsStateNews, statusLoading} from "./types";
import {
    createNewsAction,
    getAllNewsAction,
    getNewsByUserIdAction, getOneNewsAction,
    likesNews,
    removeNewsAction,
    searchNewsAction, updateNewsAction
} from "./newsAction";
import {RootState} from "../store";

const initialState: newsStateNews = {
    oneNewsById: {
        items: [],
        status: null,
        error: null,
    },
    allNews: {
        items: [],
        status: null,
        error: null,
    },
    userNewsById: {
        data: {
            items: [],
            status: null,
            error: null,
        },
        options: {
            currentPage: null,
            numberOfPages: null,
            totalNews: null,
        },
    },
    options: {
        currentPage: null,
        numberOfPages: null,
        totalNews: null
    }
}
const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.options.currentPage = action.payload
        },
        setCurrentPageByUser: (state, action: PayloadAction<number>) => {
            state.userNewsById.options.currentPage = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllNewsAction.pending, ({allNews}) => {
                allNews.status = statusLoading.loading
                allNews.error = null
            })
            .addCase(getAllNewsAction.fulfilled, ({allNews, options}, action) => {
                allNews.status = statusLoading.loaded
                allNews.error = null
                options.currentPage = action.payload.currentPage
                options.numberOfPages = action.payload.numberOfPages
                options.totalNews = action.payload.totalNews
                allNews.items = action.payload.data
                localStorage.setItem('totalNews', JSON.stringify(action.payload.data.length))
            })
            .addCase(getAllNewsAction.rejected, ({allNews}, action) => {
                allNews.status = statusLoading.wrong
                allNews.error = String(action.payload)
            })
            .addCase(createNewsAction.pending, ({allNews}) => {
                allNews.status = statusLoading.loading
                allNews.error = null
            })
            .addCase(createNewsAction.fulfilled, ({allNews}) => {
                allNews.status = statusLoading.loaded
                allNews.error = null
            })
            .addCase(createNewsAction.rejected, ({allNews}, action) => {
                allNews.status = statusLoading.wrong
                allNews.error = String(action.payload)
            })
            .addCase(searchNewsAction.pending, ({allNews}) => {
                allNews.status = statusLoading.loading
                allNews.error = null
            })
            .addCase(searchNewsAction.fulfilled, ({allNews}, action) => {
                allNews.status = statusLoading.loaded
                allNews.error = null
                allNews.items = action.payload
            })
            .addCase(searchNewsAction.rejected, ({allNews}, action) => {
                allNews.status = statusLoading.wrong
                allNews.error = String(action.payload)
            })
            .addCase(getNewsByUserIdAction.pending, ({userNewsById}) => {
                userNewsById.data.status = statusLoading.loading
                userNewsById.data.error = null
            })
            .addCase(likesNews.pending, ({allNews}) => {
                allNews.error = null
            })
            .addCase(likesNews.fulfilled, ({allNews, oneNewsById}, action) => {
                allNews.status = statusLoading.loaded
                allNews.error = null
                const userId = action.meta.arg
                if (userId) {
                    allNews.items =
                        allNews.items &&
                        allNews.items.map(item => item._id === userId ? action.payload : item)
                    oneNewsById.items =
                        oneNewsById.items &&
                        oneNewsById.items.map(item => item._id === userId ? action.payload : item)
                }
            })
            .addCase(likesNews.rejected, ({allNews,oneNewsById}, action) => {
                allNews.status = statusLoading.wrong
                oneNewsById.error = String(action.payload)
                allNews.error = String(action.payload)
            })
            .addCase(getNewsByUserIdAction.fulfilled, ({userNewsById}, action) => {
                userNewsById.data.status = statusLoading.loaded
                userNewsById.data.error = null
                userNewsById.data.items = action.payload.data
                userNewsById.options.currentPage = action.payload.options.currentPage
                userNewsById.options.numberOfPages = action.payload.options.numberOfPages
                userNewsById.options.totalNews = action.payload.options.totalNews
            })
            .addCase(getNewsByUserIdAction.rejected, ({userNewsById}, action) => {
                userNewsById.data.status = statusLoading.wrong
                userNewsById.data.error = String(action.payload)
            })
            .addCase(removeNewsAction.pending, ({userNewsById}) => {
                userNewsById.data.status = statusLoading.loading
                userNewsById.data.error = null
            })
            .addCase(removeNewsAction.fulfilled, ({userNewsById}, action) => {
                userNewsById.data.status = statusLoading.loaded
                userNewsById.data.error = null
                const idNews = action.meta.arg.id
                if (idNews)
                    userNewsById.data.items =
                        userNewsById.data.items &&
                        userNewsById.data.items.filter(id => id._id !== idNews)
            })
            .addCase(removeNewsAction.rejected, ({userNewsById}, action) => {
                userNewsById.data.status = statusLoading.wrong
                userNewsById.data.error = String(action.payload)
            })
            .addCase(getOneNewsAction.pending, ({oneNewsById}) => {
                oneNewsById.error = null
                oneNewsById.status = statusLoading.loading

            })
            .addCase(getOneNewsAction.fulfilled, ({oneNewsById}, action) => {
                oneNewsById.status = statusLoading.loaded
                oneNewsById.error = null
                oneNewsById.items = [action.payload]
            })
            .addCase(getOneNewsAction.rejected, ({oneNewsById}, action) => {
                oneNewsById.status = statusLoading.wrong
                oneNewsById.error = String(action.payload)
            })
            .addCase(updateNewsAction.pending, ({userNewsById}) => {
                userNewsById.data.error = null
                userNewsById.data.status = statusLoading.loading

            })
            .addCase(updateNewsAction.fulfilled, ({userNewsById}) => {
                userNewsById.data.error = null
                userNewsById.data.status = statusLoading.loaded
            })
            .addCase(updateNewsAction.rejected, ({userNewsById}, action) => {
                userNewsById.data.status = statusLoading.wrong
                userNewsById.data.error = String(action.payload)
            })
    }
})


export const selectorOneNewsById = (state: RootState) => state.news.oneNewsById
export const selectorAllNews = (state: RootState) => state.news.allNews
export const selectorUserNewsById = (state: RootState) => state.news.userNewsById
export const selectorOptions = (state: RootState) => state.news.options
export const {setCurrentPage, setCurrentPageByUser} = newsSlice.actions
export default newsSlice.reducer