import axios from 'axios'
import {IUpdateData, IUser} from "../store/user/types";
import {IByUserId, IPublishNews, IUpdateSend, IUploadFile} from "../store/news/types";

export const _url = `http://localhost:5000`
const _api = axios.create({baseURL: _url})

_api.interceptors.request.use((config) => {
    const getLocal = localStorage.getItem('token')
    try {
        if (getLocal) config.headers!.Authorization = getLocal
        return config
    } catch (err) {
        console.log(err)
    }
})
//auth endpoints
export const sign_in_api = (formData: IUser) => _api.post('/auth/signin', formData)
export const sign_up_api = (formData: IUser) => _api.post('/auth/signup', formData)
export const get_current_user = () => _api.get('/user') //auth
export const getAllUsers = () => _api.get(`/users`)
export const updateUser = ({updateData, id}: IUpdateData) => _api.put(`/user/${id}/update`, updateData)//auth
export const deleteUser = (id: string) => _api.delete(`/user/${id}/remove`)//auth
export const follower = (id: string) => _api.patch(`/user/${id}/follow`)//auth
// news endpoints
export const get_all_news = (page: number) => _api.get(`/news?page=${page}`)
export const get_one_news_by_id = (id: string) => _api.get(`/news/${id}`)
export const get_news_by_user_id = ({userId, page}: IByUserId) => _api.get(`/news/user_by_news/${userId}?page=${page}`) //auth
export const get_tags = (tag: string) => _api.get(`/news/tags/${tag}`)
export const get_related_tags = (tags:any) => _api.post(`/news/related_tags`,tags)
export const create_news = (newsData: IPublishNews) => _api.post('/news/create', newsData) //auth
export const remove_news = (id: string) => _api.delete(`/news/${id}`) //auth
export const update_news = ({newsData, id}: IUpdateSend) => _api.put(`/news/update/${id}`, newsData) //auth
export const search_news = (searchQuery: string) => _api.get(`/news/find/search?searchQuery=${searchQuery}`)
export const like_news = (id: string) => _api.patch(`/news/like/${id}`) //auth
//file uploads
export const fileUpload = ({formData, setLoading}: IUploadFile) => _api.post('/file/upload', formData, {
    onUploadProgress: progressEvent => {
        if (setLoading) {
            setLoading(Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
        // console.log(typeof Math.round(progressEvent.loaded / progressEvent.total * 100))
    }
})
