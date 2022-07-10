import React, {FC, useEffect} from 'react';
import './allnews.css'
import {toast} from "react-toastify";
import {SkeletonLoad} from "../../ui/LoadingUI";
import {useLocation, useNavigate} from "react-router-dom";
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {getAllNewsAction} from "../../store/news/newsAction";
import {setCurrentPage} from "../../store/news/newsSlice";
import {useQuery} from "../../utils";
import {get_all_users} from "../../store/user/userAction";
import {NewsItems, NoNews, Pagination} from "../../component";
import {selectorAllUsers} from "../../store/user/selectorsUser";
import {selectorAllNews, selectorOptions} from "../../store/news/selectorsNews";

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
            navigate(`?page=${currentPage}`)
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