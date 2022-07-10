import React, {FC, useRef, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form'
import './form.css'
import {IUser} from "../../store/user/types";
import {NavLink} from 'react-router-dom'
import {BiImageAdd} from "react-icons/bi";
import {fileUpload} from "../../service/api";

interface props {
    isLogin: boolean
    onSubmit: SubmitHandler<IUser>
}

const FormAuth: FC<props> = ({isLogin, onSubmit}) => {
    const [img, setImg] = useState<string>('')
    const {register, handleSubmit, formState: {errors}, watch, setValue} = useForm<IUser>()
    const passwordRef = useRef({});
    passwordRef.current = watch('password', '');
    return (
        <form className={isLogin ? 'containerFormRegister' : 'containerFormLogin'} onSubmit={e => e.preventDefault()}>
            {isLogin ?
                <>
                    <div className='oneAndTwoInput'>
                        <input type='text' placeholder={'First name'}{...register("firstName",
                            {required: isLogin})}/>
                        {errors.firstName && <p>First name is required</p>}

                        <input type='text' placeholder={'Last name'}{...register("lastName",
                            {required: isLogin})}/>
                        {errors.lastName && <p>Last name is required</p>}
                    </div>

                    <input type='text' placeholder={'Phone'}{...register("phone", {required: false})}/>

                    <label form='file' className='labelFileFormAuth'>
                        <input type="file" className='inputFileFormAuth' multiple id='file'
                               accept='image/.jpeg,.jpg,.png'
                               {...register("avatar", {
                                   required: false,
                                   onChange: async (event) => {
                                       const formData = new FormData()
                                       const file = event.target.files[0]
                                       setImg(file.name)
                                       formData.append('image', file)
                                       const {data} = await fileUpload({formData})
                                       setValue('avatar', data.url)
                                   }
                               })}/>

                        <div className='chooseAvatar'>
                            <p>{img ? img : <span>Choose avatar</span>}</p>
                            <BiImageAdd/>
                        </div>
                    </label>

                    <input type="email" placeholder={'Email'}
                           {...register("email",
                               {
                                   required: 'email is required',
                                   pattern: {
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                       message: "invalid email address"
                                   }
                               })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}

                    <div className='oneAndTwoInput'>
                        <input type="password" placeholder={'Password'}
                               {...register("password",
                                   {
                                       required: "You must specify a password",
                                       minLength: {value: 4, message: "Password must have at least 4 characters"}
                                   })}/>
                        {errors.password && <p>{errors.password.message}</p>}
                        <input type="password" placeholder={'Confirm'}
                               {...register("confirmPassword",
                                   {
                                       required: true,
                                       validate: value => value === passwordRef.current || "The passwords do not match"
                                   })}/>
                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    </div>
                </>
                :
                <>
                    <input
                        type="email"
                        placeholder={'Email'}
                        {...register("email",
                            {
                                required: 'email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}

                    <input type="password" placeholder={'Password'}
                           {...register("password",
                               {
                                   required: "You must specify a password",
                                   minLength: {value: 4, message: "Password must have at least 4 characters"}
                               })}/>
                    {errors.password && <p>{errors.password.message}</p>}
                    <input type="password" placeholder={'Confirm'}
                           {...register("confirmPassword",
                               {
                                   required: true,
                                   validate: value => value === passwordRef.current || "The passwords do not match"
                               })}/>
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </>
            }

            <button className='btn' type='submit' onClick={handleSubmit(onSubmit)}>
                {isLogin ? 'Register' : 'Login'}
            </button>
            <NavLink className='navLinkForm' to={isLogin ? '/login' : '/register'}>
                {isLogin ?
                    <p className='signIn'>{'sign in'}</p> :
                    <p className='signUp'>{'Not register? '}
                        <span className='NavLinkSpan'>{'Create an account!'}</span></p>}
            </NavLink>

        </form>
    );
};

export default FormAuth;