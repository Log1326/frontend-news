import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import './header.css'
import {_url} from "../../service/api";
import {BsPersonCircle} from "react-icons/bs";
import {TbLogout} from 'react-icons/tb'
import {logout} from "../../store/user/userSlice";
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {getAllNewsAction, searchNewsAction} from "../../store/news/newsAction";
import {selectorUser} from "../../store/user/selectorsUser";
import {Search} from "../index";
import {SmallLoad} from "../../ui/LoadingUI";
import {BsFillFileEarmarkPersonFill} from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'

const Header: FC = memo(() => {
        const {user, status} = useTypeSelector(selectorUser)
        const [search, setSearch] = useState<string>('');
        const dispatch = useTypeDispatch()
        const navigate = useNavigate()


        const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (search) {
                if (event.key === 'Enter') {
                    dispatch(searchNewsAction({searchQuery: search, navigate}));
                    setSearch("");
                }
            }
        }
        const handleLogout = useMemo(() => () => {
            dispatch(logout())
            navigate('/login')
        }, [])
        const getAllAndPageOne = useCallback(() => dispatch(getAllNewsAction({page: 1})), [])
        return (
            <div className='containerHeader'>
                <div>
                    {user ?
                        <>
                            {status === 'loading' ? <SmallLoad/>
                                :
                                <div>
                                    <span className='namesHeader'>
                                        <span>{user?.firstName}</span>
                                        <span>{user?.lastName}</span>
                                        <img className='headerAvatar' src={_url + user.avatar}
                                             alt={String(user.avatar)}/>
                                        <div
                                            onClick={() => navigate(`/user/${user?._id}/update`)}
                                            className='iconEditHeader'
                                        >
                                            <FiEdit/>
                                        </div>
                                        <div
                                            onClick={() => navigate('/profile')}
                                            className='iconPersonHeader'>
                                            <BsFillFileEarmarkPersonFill/>
                                        </div>
                                    </span>
                                </div>

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
                    <NavLink className='linksHeader' to={'/'}
                             onClick={getAllAndPageOne}>
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
    }
)

export default Header;