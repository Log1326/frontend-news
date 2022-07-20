import React, {FC, useState} from 'react';
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from 'react-icons/ai'
import {FaAddressCard} from 'react-icons/fa'
import {ImNewspaper} from 'react-icons/im'
import {TbNews} from 'react-icons/tb'
import './sidebar.css'
import {NavLink} from 'react-router-dom'
import {BsFillFileEarmarkPersonFill} from "react-icons/bs";
import {IUser} from "../../../store/user/types";
import {BsFillChatLeftDotsFill} from 'react-icons/bs'
interface Props {
    user: IUser | null
}

const SideBar: FC<Props> = ({user}) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    return (
        <div className='sideBarContainer'>
            {isShow ?
                <div>
                    <div className='trigger'>
                        <AiOutlineMenuUnfold
                            onClick={() => setIsShow(false)}
                        />
                    </div>

                    {user &&
                        <div>
                            <NavLink className='styleIconMenu' to={`/profile`}> <BsFillFileEarmarkPersonFill/></NavLink>
                        </div>
                    }

                    <div>
                        <NavLink className='styleIconMenu' to={'/'}><TbNews/></NavLink>
                    </div>
                    {user &&
                        <>
                            <div>
                                <NavLink className='styleIconMenu' to={`/my_news/${user?._id}`}><ImNewspaper/></NavLink>
                            </div>
                            <div>
                                <NavLink className='styleIconMenu' to={'/add_news'}><FaAddressCard/></NavLink>
                            </div>

                        </>
                    }
                </div>
                :
                <div>
                    <div className='trigger'>
                        <AiOutlineMenuFold onClick={() => setIsShow(true)}/>
                    </div>
                    {user &&
                        <NavLink to={'/profile'} className='linkText'>
                            <span>Profile</span>
                            <span className='linkTextIconsStyle'>  <BsFillFileEarmarkPersonFill/></span>
                        </NavLink>
                    }
                    <NavLink className='linkText' to={'/'}>
                        <span>All News</span>
                        <span className='linkTextIconsStyle'><TbNews/></span>
                    </NavLink>
                    {user &&
                        <>
                            <NavLink className='linkText' to={`/my_news/${user?._id}`}>
                                <span>My News</span>
                                <span className='linkTextIconsStyle'><ImNewspaper/></span>
                            </NavLink>
                            <NavLink className='linkText' to={'/add_news'}>
                                <span>Add News</span>
                                <span className='linkTextIconsStyle'><FaAddressCard/></span>
                            </NavLink>
                            <NavLink className='linkText' to={'/chat'}>
                                <span>Chat</span>
                                <span className='linkTextIconsStyle'><BsFillChatLeftDotsFill/></span>
                            </NavLink>
                        </>
                    }
                </div>
            }
        </div>
    );
}

export default SideBar;