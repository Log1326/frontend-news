import React, {FC, memo, useCallback, useState} from 'react';
import {Link, NavigateFunction, NavLink} from 'react-router-dom'
import './header.css'
import {_url} from "../../service/api";
import {BsPersonCircle} from "react-icons/bs";
import {TbLogout} from 'react-icons/tb'
import {searchNewsAction} from "../../store/news/newsAction";
import {Search} from "../index";
import {SmallLoad} from "../../ui/LoadingUI";
import {AppDispatch} from "../../store/store";
import {IUser, statusUser} from "../../store/user/types";
import {logout} from "../../store/user/userSlice";

interface Props {
    dispatch: AppDispatch
    navigate: NavigateFunction
    user: IUser | null
    status: statusUser | null
}

const Header: FC<Props> = memo(({dispatch, navigate, user, status}) => {

    const [search, setSearch] = useState<string>('');
    const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (search) {
            if (event.key === 'Enter') {
                dispatch(searchNewsAction({searchQuery: search, navigate}));
                setSearch("");
            }
        }
    }
    const handleLogout = useCallback(() => {
        dispatch(logout())
        navigate('/login')
    }, [])
    const startPage = useCallback(() => () => navigate('/?page=1'), [navigate])
    return (
        <div className='containerHeader'>
            <div>
                {user && user ?
                    <>
                        {status === 'loading' ? <SmallLoad/>
                            :
                            <Link to={`/user/${user?._id}/update`} className='linkTextHeader'>
                                    <span className='namesHeader'>
                                        <span>{user?.firstName}</span>
                                        <span>{user?.lastName}</span>
                                        <img className='headerAvatar' src={_url + user.avatar}
                                             alt={String(user.avatar)}/>
                                    </span>
                            </Link>
                        }

                    </>
                    :
                    <>
                        {status === 'loading' ? <SmallLoad/>
                            :
                            <p className='namesHeader'>
                                <span>Guest</span>
                                <BsPersonCircle size={25}/>
                            </p>
                        }

                    </>
                }
            </div>
            <div className='linksAndSearchHeader'>
                <NavLink className='linksHeader' to={'/'} onClick={startPage}>
                    News
                </NavLink>

                {user ?
                    <>
                        <button className='bntLogout' onClick={handleLogout}>
                            <span>Logout</span>
                            <TbLogout/>
                        </button>
                    </>

                    :
                    <NavLink className='linksHeader' to={'/login'}>
                        <span className='linksSpan'>Login</span>
                    </NavLink>
                }

                <Search search={search} setSearch={setSearch} handleSubmit={handleSubmit}/>
            </div>
        </div>
    );
})


export default Header;