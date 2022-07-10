import React, {FC} from 'react';
import './login.css'
import {SubmitHandler} from "react-hook-form";
import {IUser} from "../../../store/user/types";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {sign_in} from "../../../store/user/userAction";
import {useTypeDispatch} from "../../../store/store";
import {FormAuth} from "../../../component";

const Login: FC = () => {
    const dispatch = useTypeDispatch()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<IUser> = formData => dispatch(sign_in({formData, navigate, toast}))
    return (
        <div className='containerLogin'>
            <FormAuth onSubmit={onSubmit} isLogin={false}/>
        </div>
    );
};

export default Login;