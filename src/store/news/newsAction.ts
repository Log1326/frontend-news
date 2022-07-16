import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from '../../service/api'
import {
    GetNewsAll,
    IByUserId,
    IDataPublish, IFindLikes, IGetAll,
    IGetNewsByUser,
    INews,
    IRemoveNews, ISearch,
    IUpdatePublish,
    KnowError
} from "./types";


export const getAllNewsAction = createAsyncThunk<GetNewsAll, IGetAll, { rejectValue: KnowError }>(
    'news/getAllNews', async ({page, navigate}, {rejectWithValue}) => {
        try {
            const {data} = await api.get_all_news(page)
            navigate && navigate(`?page=${page}`)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)
export const getOneNewsAction = createAsyncThunk<INews, string, { rejectValue: KnowError }>(
    'news/getOneNews', async (id, {rejectWithValue}) => {
        try {
            const {data} = await api.get_one_news_by_id(id)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)

export const getNewsByUserIdAction = createAsyncThunk<IGetNewsByUser, IByUserId, { rejectValue: KnowError }>(
    'news/getOneNewsByUserId', async ({userId, page}, {rejectWithValue}) => {
        try {
            const {data} = await api.get_news_by_user_id({userId, page})
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            if (err.response.status === 402 || 403) {
                return rejectWithValue(err.response.status)
            } else {
                return rejectWithValue(error)

            }
        }
    }
)
export const getTagNewsAction = createAsyncThunk<INews[], string, { rejectValue: KnowError }>(
    'news/getTagNews', async (tag, {rejectWithValue}) => {
        try {
            const {data} = await api.get_tags(tag)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            console.log(err)
            return rejectWithValue(error)
        }
    }
)
export const getMyTags = createAsyncThunk<string[], string, { rejectValue: KnowError }>(
    'news/getMyTags', async (userId, {rejectWithValue}) => {
        try {
            const {data} = await api.get_my_tags(userId)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)

export const getTagsNewsRelatedAction = createAsyncThunk<INews[], string, { rejectValue: KnowError }>(
    'news/getTagsRelatedNews', async (tags, {rejectWithValue}) => {
        try {
            const {data} = await api.get_related_tags(tags)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)

export const searchNewsAction = createAsyncThunk<INews[], ISearch, { rejectValue: KnowError }>(
    'news/searchNews', async ({searchQuery, navigate}, {rejectWithValue}) => {
        try {
            const {data} = await api.search_news(searchQuery)
            navigate(`/search?searchQuery=${searchQuery}`);
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)

export const createNewsAction = createAsyncThunk<INews[], IDataPublish, { rejectValue: KnowError }>(
    'news/createNews', async ({newsData, navigate, toast}, {rejectWithValue}) => {
        try {
            const {data} = await api.create_news(newsData)
            navigate('/')
            toast.success('create successful')
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)


export const removeNewsAction = createAsyncThunk<string, IRemoveNews, { rejectValue: KnowError }>(
    'news/removeNews', async ({id, toast}, {rejectWithValue}) => {
        try {
            const {data} = await api.remove_news(id)
            toast.success(data.message)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)

export const updateNewsAction = createAsyncThunk<INews, IUpdatePublish, { rejectValue: KnowError }>(
    'news/updateNews', async ({newsData, id, navigate, toast}, {rejectWithValue}) => {
        try {
            const {data} = await api.update_news({newsData, id})
            toast.success('update successful')
            navigate(-1)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)

export const likesNews = createAsyncThunk<INews, string, { rejectValue: KnowError }>(
    'news/likesNews', async (id, {rejectWithValue}: any) => {
        try {
            const {data} = await api.like_news(id)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)

export const findLikes = createAsyncThunk<INews[], IFindLikes, { rejectValue: KnowError }>(
    'news/findLikes', async ({userId}, {rejectWithValue}: any) => {
        try {
            const {data} = await api.find_likes(userId)
            return data
        } catch (err: any) {
            const error = err.request.response.replace(/['"{}]+/g, '')
            return rejectWithValue(error)
        }
    }
)
