import React, {FC, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import {Search} from "../../ui";
import './header.css'
import {logout, selectorUser} from "../../store/user/userSlice";
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {_url} from "../../service/api";
import {BsPersonCircle} from "react-icons/bs";
import {TbLogout} from 'react-icons/tb'
import {SmallLoad} from "../../ui/LoadingUI";
import {searchNewsAction} from "../../store/news/newsAction";


const Header: FC = () => {
    const {user, status} = useTypeSelector(selectorUser)
    const [search, setSearch] = useState<string>('');
    const dispatch = useTypeDispatch()
    const navigate = useNavigate()
    const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (search) {
            if (event.key === 'Enter') {
                dispatch(searchNewsAction(search));
                navigate(`/search?searchQuery=${search}`);
                setSearch("");
            }
        }
    };
    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <div className='containerHeader'>
            <div>
                {user ?
                    <>
                        {status === 'loading' ? <SmallLoad/>
                            :
                            <p className='namesHeader'>
                                <span>{user?.firstName}</span>
                                <span>{user?.lastName}</span>
                                <img className='headerAvatar' src={_url + user.avatar} alt={String(user.avatar)}/>
                            </p>
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
                         onClick={() => navigate('/')}>
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
};

export default Header;