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
import {user, users,} from "../../store/user/selectorsUser";
import {allNews, optionsSelector} from "../../store/news/selectorsNews";
import {NewsItems, NoNews, Pagination} from "../../component";


const AllNews: FC = () => {
    const userData = useTypeSelector(user)
    const usersData = useTypeSelector(users)

    const {items, status, error} = useTypeSelector(allNews)
    const options = useTypeSelector(optionsSelector)
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
                    <div className='itemNewsContainer'>
                        {items && items.map(item =>
                            <NewsItems dispatch={dispatch}
                                       users={usersData}
                                       user={userData}
                                       key={`${item._id}-${item.createdAt}`}
                                       item={item}/>)}
                    </div>
                    <div>
                        {items?.length === 0 && location.pathname === '/' &&
                            <NoNews>There are no news!</NoNews>}
                    </div>
                    <div>
                        {items?.length === 0 && location.pathname !== '/' &&
                            <NoNews>We couldn't find any matches for: {searchQuery}</NoNews>
                        }
                    </div>
                    <div>
                        {items && items?.length > 0 && !searchQuery &&
                            <div className='paginationPosition'>
                                <Pagination
                                    options={options}
                                    setCurrentPage={setCurrentPage}
                                    dispatch={dispatch}
                                />
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    );
}

export default AllNews;