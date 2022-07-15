import {NavigateFunction} from "react-router-dom";

export interface newsStateNews {
    oneNewsById: Items
    allNews: Items
    userNewsById: {
        data: Items
        options: IOptions
    }
    tagsNews: Items
    tagsRelatedNews: Items
    options: IOptions
}

export interface IOptions {
    currentPage: number | null
    numberOfPages: number | null
    totalNews: number | null
}

export type Items = {
    items: INews[]
    status: statusLoading | null
    error: string | null
}

export enum statusLoading {
    loading = 'loading',
    loaded = 'completed',
    wrong = 'wrong'
}


export interface INews {
    title: string,
    description: string,
    tags: string[],
    viewsCount: string
    imageUrl: string,
    creator: string
    likes: string[]
    createdAt: string
    _id: string
}


export interface GetNewsAll {
    data: INews[]
    currentPage: number | null
    numberOfPages: number | null
    totalNews: number | null
}


export interface IGetNewsByUser {
    data: INews[]
    options: IOptions
}

export interface IUploadFile {
    formData: FormData,
    setLoading?: (loading: number | null) => void
}

export interface IPublishNews {
    title: string
    description: string
    tags: string
    imageUrl: string
}

export interface IDataPublish {
    newsData: IPublishNews
    navigate: NavigateFunction
    toast: any
}

export interface IUpdatePublish {
    newsData: IPublishNews
    id: string
    navigate: NavigateFunction
    toast: any
}

export interface IUpdateSend {
    newsData: IPublishNews
    id: string
}


export interface IByUserId {
    userId: string
    page?: number
}

export interface IRemoveNews {
    id: string
    toast: any
}

export interface KnowError {
    error: string
}

export interface ISearch {
    searchQuery: string
    navigate: NavigateFunction
}

export interface IGetAll {
    page: number
    navigate?: NavigateFunction
}

