import React, {FC} from 'react';
import './mynewsdesc.css'
import {INews} from "../../store/news/types";
import {_url} from "../../service/api";
import moment from "moment";
import {NavLink} from "react-router-dom";
import {excerpt} from "../../utils";

interface Props {
    item: INews
    handleUpdate: (id: string) => void
    handleRemove: (id: string) => void
}


const MyNewsDesk: FC<Props> = ({item, handleRemove, handleUpdate}) => {
    const createAt = moment(item.createdAt).format('LLL')
    return (
        <div className='containerMyNewsDesc'>
            <div className='itemMyNews'>
                <div>
                    <span>title:</span>{item.title}
                </div>
                <div>
                    <span>description:</span>{item.description.length > 40 ? excerpt(item.description, 40) : item.description}
                </div>
                <div>
                    <span>tags:</span>{item.tags.map((tag, index) =>
                    <NavLink className='itemNavLinkMyNews' to={`/${tag}`} key={index}>{`#${tag}`}</NavLink>
                )}
                </div>
                <div className='itemMyNews'>
                    <div>
                        <span>created at: {createAt}</span>
                    </div>
                    <div>
                        <span>like: {item.likes.length}</span>
                    </div>
                    <div>
                        <span>views count: {item.viewsCount}</span>
                    </div>
                </div>
            </div>

            <div>
                <img className='imgControl' src={_url + item.imageUrl} alt={item.title}/>
            </div>

            <div className='buttonStyles'>
                <span onClick={() => handleUpdate(item._id)}>edit</span>
                <span onClick={() => handleRemove(item._id)}>remove</span>
            </div>
        </div>
    );
};

export default MyNewsDesk;