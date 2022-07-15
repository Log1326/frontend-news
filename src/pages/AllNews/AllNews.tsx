import React, {FC, Suspense, useEffect} from 'react';
import './allnews.css'
import {toast} from "react-toastify";
import {SearchLoad, SkeletonLoad} from "../../ui/LoadingUI";
import {useLocation, useNavigate} from "react-router-dom";
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {getAllNewsAction} from "../../store/news/newsAction";
import {setCurrentPage} from "../../store/news/newsSlice";
import {useQuery} from "../../utils";
import {get_all_users} from "../../store/user/userAction";
import {selectorUser} from "../../store/user/selectorsUser";
import {selectorAllNews, selectorOptions} from "../../store/news/selectorsNews";
import {NoNews, Pagination} from "../../component";

const NewsItems = React.lazy(() => import('../../component/Items/NewsItems/NewsItems'))

const AllNews: FC = () => {
    const {user, users} = useTypeSelector(selectorUser)
    const {items, status, error} = useTypeSelector(selectorAllNews)
    const options = useTypeSelector(selectorOptions)
    const location = useLocation();
    const query = useQuery();
    const navigate = useNavigate()
    const dispatch = useTypeDispatch()
    const searchQuery = query.get("searchQuery");
    useEffect(() => {
        error && toast.error(error)
    }, [error])
    useEffect(() => {
        options.currentPage ?
            dispatch(getAllNewsAction({page: options.currentPage, navigate}))
            :
            dispatch(getAllNewsAction({page: 1}))
    }, [options.currentPage])
    useEffect(() => {
        dispatch(get_all_users())
    }, [])
    return (
        <div className='containerAllNews'>
            {status === 'loading' ? <SkeletonLoad/> :
                <>
                    <Suspense fallback={<SearchLoad/>}>
                        <div className='itemNewsContainer'>
                            {items && items.map(item =>
                                <NewsItems dispatch={dispatch}
                                           users={users}
                                           user={user}
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