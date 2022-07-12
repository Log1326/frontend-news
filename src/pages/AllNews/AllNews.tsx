import React, {FC, useEffect, useLayoutEffect, Suspense} from 'react';
import './allnews.css'
import {toast} from "react-toastify";
import {SkeletonLoad, SearchLoad} from "../../ui/LoadingUI";
import {useLocation, useNavigate} from "react-router-dom";
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {getAllNewsAction} from "../../store/news/newsAction";
import {setCurrentPage} from "../../store/news/newsSlice";
import {useQuery} from "../../utils";
import {get_all_users} from "../../store/user/userAction";
import {selectorAllUsers} from "../../store/user/selectorsUser";
import {selectorAllNews, selectorOptions} from "../../store/news/selectorsNews";
import {NoNews, Pagination} from "../../component";

const NewsItems = React.lazy(() => import('../../component/NewsItems/NewsItems'))

const AllNews: FC = () => {
    const users = useTypeSelector(selectorAllUsers)
    const {items, status, error} = useTypeSelector(selectorAllNews)
    const options = useTypeSelector(selectorOptions)
    const location = useLocation();
    const query = useQuery();
    const navigate = useNavigate()
    const dispatch = useTypeDispatch()
    const searchQuery = query.get("searchQuery");
    useLayoutEffect(() => {
        error && toast.error(error)
    }, [error])
    useLayoutEffect(() => {
        dispatch(get_all_users())
    }, [])

    useEffect(() => {
        if (options.currentPage) {
            dispatch(getAllNewsAction(options.currentPage))
            navigate(`?page=${options.currentPage}`)
        } else {
            dispatch(getAllNewsAction(1))
        }
    }, [options.currentPage])

    return (
        <div className='containerAllNews'>
            {status === 'loading' ? <SkeletonLoad/> :
                <>
                    <Suspense fallback={<SearchLoad/>}>
                        <div className='itemNewsContainer'>
                            {items && items.map(item =>
                                <NewsItems dispatch={dispatch}
                                           users={users}
                                           key={`${item._id}-${item.createdAt}`}
                                           item={item}/>)}
                        </div>
                    </Suspense>
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
                                options={options}
                                setCurrentPage={setCurrentPage}
                                dispatch={dispatch}
                            />
                        </div>
                    }
                </>
            }
        </div>
    );
}

export default AllNews;