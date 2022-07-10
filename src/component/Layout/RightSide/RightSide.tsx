import React, {FC, useMemo} from 'react';
import './rightside.css'
import {useTypeSelector} from "../../../store/store";
import {selectorAllUsers, selectorUser} from "../../../store/user/selectorsUser";
import {_url} from "../../../service/api";
import {selectorAllNews} from "../../../store/news/selectorsNews";

const RightSide: FC = () => {
    const users = useTypeSelector(selectorAllUsers)
    const {user} = useTypeSelector(selectorUser)
    const {items} = useTypeSelector(selectorAllNews)
    const filteredUsers = useMemo(() => users.filter(item => item._id !== user?._id), [user])
    const findTagsUsers = items.filter(item => item.creator === user?._id).map(item => item)

    return (
        <div>

            <div>
                <p>My Tags</p>
                {findTagsUsers && findTagsUsers.map(tag =>
                    <div key={tag._id}>
                        <p>{tag.tags.toString()}</p>
                    </div>
                )}
            </div>
            <div>
                {filteredUsers && filteredUsers.map(user =>
                    <div key={user._id}>
                        {user.firstName}
                        {user.lastName}
                        <img style={{width: '7rem', height: '7rem'}} src={_url + user.avatar}
                             alt={String(user.avatar)}/>
                    </div>
                )}
            </div>

        </div>
    );
};

export default RightSide;