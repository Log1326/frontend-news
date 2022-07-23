import React, {FC, useEffect} from 'react';
import './minenews.css'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {getNewsByUserIdAction, removeNewsAction} from "../../store/news/newsAction";
import {setCurrentPageByUser} from "../../store/news/newsSlice";
import {toast} from "react-toastify";
import {BigLoad} from "../../ui/LoadingUI";
import {useNavigate} from "react-router-dom";
import {MyNewsDesc, NoNews, Pagination} from "../../component";
import {user} from "../../store/user/selectorsUser";
import {newsByUserId} from "../../store/news/selectorsNews";

const MyNewsDesk: FC = () => {
    const userData = useTypeSelector(user)
    const {data, options} = useTypeSelector(newsByUserId)
    const navigate = useNavigate()
    const page: number | null = options.currentPage !== null ? options.currentPage : 1
    const dispatch = useTypeDispatch()
    useEffect(() => {
        data.error && toast.error(data.error)
    }, [data.error])
    useEffect(() => {
        userData?._id && dispatch(getNewsByUserIdAction({userId: userData?._id, page}))
    }, [userData?._id])
    useEffect(() => {
        page && navigate(`?page=${page}?totalCountNews=${options.totalNews}?numberOfPages=${options.numberOfPages}`)
    }, [page])
    const handleUpdate = (id: string) => navigate(`/update/${id}`)
    const handleRemove = (id: string) => dispatch(removeNewsAction({id, toast}))
    return (
        <div className='containerMyNews'>
            {data.status === 'loading' ?
                <BigLoad/>
                :
                <>
                    <div>
                        {data.items && data.items?.map(item =>
                            <MyNewsDesc handleRemove={handleRemove}
                                        handleUpdate={handleUpdate}
                                        item={item}
                                        key={item.createdAt + item._id}/>
                        )}
                    </div>
                    <div>
                        {data.items?.length === 0 && <NoNews>There are not your news</NoNews>}
                    </div>
                    {data.items && data.items?.length > 0 &&
                        <div className='paginationPositionMyNews'>
                            <Pagination setCurrentPage={setCurrentPageByUser} options={options} dispatch={dispatch}/>
                        </div>
                    }
                </>
            }
        </div>
    );
}

export default MyNewsDesk;

