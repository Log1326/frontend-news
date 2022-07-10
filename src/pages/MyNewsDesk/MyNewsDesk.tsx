import React, {FC, useEffect} from 'react';
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
    const {currentPage, numberOfPages, totalNews} = options
    const navigate = useNavigate()
    const page = currentPage !== null ? currentPage : 1
    const dispatch = useTypeDispatch()
    const userId = user?._id

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    useEffect(() => {
        userId && dispatch(getNewsByUserIdAction({userId, page}))
    }, [userId])
    useEffect(() => {
        page && navigate(`?page=${page}?totalCountNews=${totalNews}?numberOfPages=${numberOfPages}`)
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
                    <div>{items?.length === 0 && <NoNews children={'There are not your news'}/>}</div>
                    {items && items?.length > 0 &&
                        <div className='paginationPositionMyNews'>
                            <Pagination setCurrentPage={setCurrentPageByUser} currentPage={currentPage}
                                        numberOfPages={numberOfPages} dispatch={dispatch}/>
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default MyNewsDesk;

