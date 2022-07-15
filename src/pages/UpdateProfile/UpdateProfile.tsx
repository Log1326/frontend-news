import React, {FC} from 'react';
import {useTypeDispatch, useTypeSelector} from "../../store/store";
import {useNavigate, useParams} from "react-router-dom";
import {SubmitHandler} from "react-hook-form";
import {IUpdateUser, IUser} from "../../store/user/types";
import {update_user} from "../../store/user/userAction";
import {toast} from "react-toastify";
import './updateUser.css'
import FormUpdateUser from "../../component/Form/FormUpdateUser/FormUpdateUser";
import {selectorUser} from "../../store/user/selectorsUser";

const UpdateProfile: FC = () => {
    const {user} = useTypeSelector(selectorUser)
    const {id} = useParams()
    const dispatch = useTypeDispatch()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<IUser> = (updateData) =>
        dispatch(update_user({updateData, id, navigate, toast} as IUpdateUser))
    return (
        <div className='containerUpdateUser'>
            <FormUpdateUser onSubmit={onSubmit} user={user} navigate={navigate} dispatch={dispatch} id={id}/>
        </div>
    );
};

export default UpdateProfile;