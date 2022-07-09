import React, {FC, useState} from 'react';
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from 'react-icons/ai'
import {FaAddressCard} from 'react-icons/fa'
import {ImNewspaper} from 'react-icons/im'
import {TbNews} from 'react-icons/tb'
import './sidebar.css'
import {Link} from 'react-router-dom'
import {getAllNewsAction} from "../../../store/news/newsAction";
import {useTypeDispatch, useTypeSelector} from "../../../store/store";
import {selectorUser} from "../../../store/user/userSlice";


const SideBar: FC = () => {
    const {user} = useTypeSelector(selectorUser)

    const [isShow, setIsShow] = useState<boolean>(false)
    const dispatch = useTypeDispatch()

    return (
        <div className='sideBarContainer'>
            {isShow ?
                <div>
                    <div className='trigger'>
                        <AiOutlineMenuUnfold
                            onClick={() => setIsShow(false)}
                        />
                    </div>
                    <div onClick={() => dispatch(getAllNewsAction(1))}>
                        <Link className='styleIconMenu' to={'/'}><TbNews/></Link>
                    </div>
                    {user &&
                        <>
                            <div>
                                <Link className='styleIconMenu' to={`my_news/${user?._id}`}><ImNewspaper/></Link>
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
                    <Link className='linkText' to={'/'} onClick={() => dispatch(getAllNewsAction(1))}>
                        <span>All News</span>
                        <span className='linkTextIconsStyle'><TbNews/></span>
                    </Link>
                    {user &&
                        <>
                            <Link className='linkText' to={`my_news/${user?._id}`}>
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
};

export default SideBar;