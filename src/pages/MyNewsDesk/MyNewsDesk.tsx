import React, {FC, useEffect, useLayoutEffect} from 'react';
import './minenews.css'
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {getNewsByUserIdAction, removeNewsAction} from "../../store/news/newsAction";
import {setCurrentPageByUser} from "../../store/news/newsSlice";
import {toast} from "react-toastify";
import {BigLoad} from "../../ui/LoadingUI";
import {useNavigate} from "react-router-dom";
import {MyNewsDesc, NoNews, Pagination} from "../../component";
import {selectorUser} from "../../store/user/selectorsUser";
import {selectorUserNewsById} from "../../store/news/selectorsNews";

const MyNewsDesk: FC = () => {
    const {user} = useTypeSelector(selectorUser)
    const {data, options} = useTypeSelector(selectorUserNewsById)
    const {items, status, error} = data
    const navigate = useNavigate()
    const page: number | null = options.currentPage !== null ? options.currentPage : 1
    const dispatch = useTypeDispatch()


    useLayoutEffect(() => {
        error && toast.error(error)
    }, [error])
    useEffect(() => {
        user?._id && dispatch(getNewsByUserIdAction({userId: user?._id, page}))
    }, [user?._id])
    useEffect(() => {
        page && navigate(`?page=${page}?totalCountNews=${options.totalNews}?numberOfPages=${options.numberOfPages}`)
    }, [page])
    const handleUpdate = (id: string) => navigate(`/update/${id}`)
    const handleRemove = (id: string) => dispatch(removeNewsAction({id, toast}))
    return (
        <div className='containerMyNews'>
            {status === 'loading' ?
                <BigLoad/>
                :
                <>
                    <div>
                        {items && items?.map(item => <MyNewsDesc handleRemove={handleRemove} handleUpdate={handleUpdate}
                                                                 item={item} key={item.createdAt + item._id}/>)}
                    </div>
                    <div>
                        {items?.length === 0 && <NoNews>{`There are not your news`}</NoNews>}
                    </div>
                    {items && items?.length > 0 &&
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

