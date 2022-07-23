import React, {FC, memo, useState} from 'react';
import {_url} from "../../../service/api";
import {INews} from "../../../store/news/types";
import {excerpt} from "../../../utils";
import {BiLike} from "react-icons/bi";
import {GrView} from "react-icons/gr";
import './mypostprofile.css'
import {FaToggleOn} from 'react-icons/fa'

interface Props {
    item: INews
}

const MyPost: FC<Props> = memo(({item}) => {
    const [toggle, setToggle] = useState<boolean>(false)
    return (
        <div className='containerMyPostProfile'>
            <div className='itemMyPostProfile'>
                <div className='itemTitleMyPostProfile'> {item.title}</div>
                {!toggle ?
                    <div>{excerpt(item.description, 200)}
                        <span className='threeTouch'
                              onClick={() => setToggle(!toggle)}>....</span>
                    </div>
                    :
                    <div>
                        <span>{item.description}</span>
                        <span className='threeTouchClose'
                              onClick={() => setToggle(!toggle)}>
                            <FaToggleOn/>
                        </span>
                    </div>
                }

                <div className='likeAndViewProfile'>
                    <div>
                        <span>{item.likes.length}</span>
                        <BiLike/>
                    </div>
                    <div>
                        <span>{item.viewsCount}</span>
                        <GrView/>
                    </div>
                </div>
            </div>
            <div>
                <img className='imgControlmyPostProfile' src={_url + item.imageUrl} alt=""/>
            </div>
        </div>
    );
})

export default MyPost;