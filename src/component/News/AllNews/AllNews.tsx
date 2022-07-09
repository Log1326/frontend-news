import React, {FC, useEffect} from 'react';
import {useTypeDispatch, useTypeSelector} from "../../../store/store";
import {getAllNewsAction} from "../../../store/news/newsAction";
import {selectorAllNews, selectorOptions, setCurrentPage} from "../../../store/news/newsSlice";
import {toast} from "react-toastify";
import NewsItems from "./NewsItems/NewsItems";
import {SkeletonLoad} from "../../../ui/LoadingUI";
import {useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "../../../utils";
import {NoNews, Pagination} from "../../../ui";
import './allnews.css'
import {selectorAllUsers} from "../../../store/user/userSlice";
import {get_all_users} from "../../../store/user/userAction";

const AllNews: FC = () => {
    const users = useTypeSelector(selectorAllUsers)
    const {items, status, error} = useTypeSelector(selectorAllNews)
    const {currentPage, numberOfPages} = useTypeSelector(selectorOptions)
    const location = useLocation();
    const query = useQuery();
    const searchQuery = query.get("searchQuery");
    const navigate = useNavigate()
    const dispatch = useTypeDispatch()
    useEffect(() => {
        error && toast.error(error)
    }, [error])

    useEffect(() => {
        if (currentPage) {
            dispatch(getAllNewsAction(currentPage))
            navigate(`?currentPage=${currentPage}`)
        } else {
            dispatch(getAllNewsAction(1))
        }
    }, [currentPage])

    useEffect(() => {
        dispatch(get_all_users())
    }, [])
    return (
        <div className='containerAllNews'>
            {status === 'loading' ? <SkeletonLoad/> :
                <>
                    <div className='itemNewsContainer'>
                        {items && items.map(item =>
                            <NewsItems dispatch={dispatch}
                                       users={users}
                                       key={`${item._id}-${item.createdAt}`}
                                       item={item}/>)}
                    </div>
                    <div>
                        {items?.length === 0 && location.pathname === '/' &&
                            <NoNews children={'There are no news!'}/>}
                    </div>
                    <div>
                        {items?.length === 0 && location.pathname !== '/' &&
                            <NoNews children={'We couldn\'t find any matches for: '} searchQuery={searchQuery}/>}
                    </div>
                    {items && items?.length > 0 && !searchQuery &&
                        <div className='paginationPosition'>
                            <Pagination
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                numberOfPages={numberOfPages}
                                dispatch={dispatch}
                            />
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default AllNews;