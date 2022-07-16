import React, {FC, memo, useState} from 'react';
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from 'react-icons/ai'
import {FaAddressCard} from 'react-icons/fa'
import {ImNewspaper} from 'react-icons/im'
import {TbNews} from 'react-icons/tb'
import './sidebar.css'
import {Link} from 'react-router-dom'
import {BsFillFileEarmarkPersonFill} from "react-icons/bs";
import {IUser} from "../../../store/user/types";

interface Props {
    user: IUser | null
}

const SideBar: FC<Props> = memo(({user}) => {
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
                            <Link className='styleIconMenu' to={`/profile`}> <BsFillFileEarmarkPersonFill/></Link>
                        </div>
                    }

                    <div>
                        <Link className='styleIconMenu' to={'/'}><TbNews/></Link>
                    </div>
                    {user &&
                        <>
                            <div>
                                <Link className='styleIconMenu' to={`/my_news/${user?._id}`}><ImNewspaper/></Link>
                            </div>
                            <div>
                                <Link className='styleIconMenu' to={'/add_news'}><FaAddressCard/></Link>
                            </div>

                        </>
                    }
                </div>
                :
                <div>
                    <div className='trigger'>
                        <AiOutlineMenuFold onClick={() => setIsShow(true)}/>
                    </div>
                    <Link to={'/profile'} className='linkText'>
                        <span>Profile</span>
                        <span className='linkTextIconsStyle'>  <BsFillFileEarmarkPersonFill/></span>
                    </Link>
                    <Link className='linkText' to={'/'}>
                        <span>All News</span>
                        <span className='linkTextIconsStyle'><TbNews/></span>
                    </Link>
                    {user &&
                        <>
                            <Link className='linkText' to={`/my_news/${user?._id}`}>
                                <span>My News</span>
                                <span className='linkTextIconsStyle'><ImNewspaper/></span>
                            </Link>
                            <Link className='linkText' to={'/add_news'}>
                                <span>Add News</span>
                                <span className='linkTextIconsStyle'><FaAddressCard/></span>
                            </Link>
                        </>
                    }
                </div>
            }
        </div>
    );
})

export default SideBar;