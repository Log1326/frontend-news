import React, {FC} from 'react';
import {Form} from "../../../ui";
import {SubmitHandler} from "react-hook-form";
import './register.css'
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {sign_up} from "../../../store/user/userAction";
import {IUser} from "../../../store/user/types";
import {useTypeDispatch} from "../../../store/store";


const Registration: FC = () => {
    const dispatch = useTypeDispatch()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<IUser> = (formData) =>
        dispatch(sign_up({formData, navigate, toast}))
    return (
        <div className='containerRegister'>
            <Form onSubmit={onSubmit} isLogin={true}/>
        </div>
    );
};

export default Registration;