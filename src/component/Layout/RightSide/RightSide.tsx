import React, {FC, memo} from 'react';
import './rightside.css'
import {_url} from "../../../service/api";
import {NavLink} from "react-router-dom";
import {IUsers} from "../../../store/user/types";

interface Props {
    UsersFiltered: IUsers[]
    UserFindItems: string[]
}

const RightSide: FC<Props> = memo(({UserFindItems, UsersFiltered}) => {
    return (
        <div className='containerRightSide'>

            <div className='tagsContainer'>
                {UserFindItems.map((item, index) =>
                    <NavLink key={index} className='rightSideNavLink' to={`news/tags/${item}`}>
                        <span>{`#${item}`}</span>
                    </NavLink>
                )}
            </div>
            <div>
                {UsersFiltered && UsersFiltered.map(user =>
                    <div key={user._id} className='containerUsersRightSide'>
                        <img className='imgStyleRightSide' src={_url + user.avatar}
                             alt={String(user.avatar)}/>
                        <p className='firstNameAndLastname'>
                            <span>{user.firstName}</span>
                            <span>{user.lastName}</span>
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
})

export default RightSide;