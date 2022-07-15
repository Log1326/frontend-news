import React, {FC, memo, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form'
import {IUser} from "../../../store/user/types";
import {BiImageAdd} from "react-icons/bi";
import {_url, fileUpload} from "../../../service/api";
import {patternValueEmail} from "../../../utils";
import './formUpdateUser.css'
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import imgUpload from "../../../accept/imgUpload.png";
import {NavigateFunction} from "react-router-dom";
import {RiDeleteBin5Line} from 'react-icons/ri'
import {AppDispatch} from "../../../store/store";
import {remove_user} from "../../../store/user/userAction";
import {toast} from "react-toastify";

interface props {
    onSubmit: SubmitHandler<IUser>
    user: IUser | null
    navigate: NavigateFunction
    dispatch: AppDispatch
    id?: string
}

const FormUpdateUser: FC<props> = memo(({onSubmit, user, navigate, dispatch, id}) => {
    const [img, setImg] = useState<string>('')
    const [isLoading, setLoading] = useState<number | null>(null)
    const {register, handleSubmit, formState: {errors}, setValue, setFocus} = useForm<IUser>({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            phone: user?.phone,
            email: user?.email,
            avatar: user?.avatar
        }
    })
    useEffect(() => {
        !user && navigate(-1)
        user?.avatar && setImg(user?.avatar)
    }, [user])
    useEffect(() => {
        setFocus('firstName')
    }, [])
    const removeUser = () => {
        if (window.confirm('you remove your profile! are you absolutely sure?')) {
            id && dispatch(remove_user({id, navigate, toast}))
        }

    }
    return (
        <form onSubmit={e => e.preventDefault()}>
            <div className='TitleUpdateProfile'>
                Update Profile
            </div>
            <div className='containerFieldAndImg'>
                <div className='removeUserStyle' onClick={() => removeUser()}>
                    <RiDeleteBin5Line/>
                </div>
                <div className='containerFormUpdateUser'>
                    <div>
                        <input type='text' placeholder={'First name'}{...register("firstName",
                            {required: false})}/>
                        {errors.firstName && <p>First name is required</p>}
                    </div>
                    <div>
                        <input type='text' placeholder={'Last name'}{...register("lastName",
                            {required: false})}/>
                        {errors.lastName && <p>Last name is required</p>}
                    </div>
                    <div>
                        <input type='text' placeholder={'Phone'}{...register("phone", {required: false})}/>
                    </div>
                    <div>
                        <input type="email" placeholder={'Email'}
                               {...register("email",
                                   {
                                       required: 'email is required',
                                       pattern: {
                                           value: patternValueEmail,
                                           message: "invalid email address"
                                       }
                                   })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <button className='btnUpdateUser' type='submit' onClick={handleSubmit(onSubmit)}>
                        update
                    </button>
                </div>
                <div>
                    <div>
                        {isLoading && isLoading < 99 ?
                            <div className='circleProgressbar'>
                                <CircularProgressbar
                                    background
                                    backgroundPadding={6}
                                    styles={buildStyles({
                                        backgroundColor: "#f0e6ea",
                                        textColor: "#000",
                                        pathColor: "#fff",
                                        trailColor: "transparent"
                                    })}
                                    value={isLoading} text={`${isLoading}%`}/>
                            </div>
                            :
                            <div>
                                <div className='formUpdateImgAndButtonUser'>
                                    {img ?
                                        <>
                                            <button onClick={() => setImg('')}>X</button>
                                            <img src={_url + img} alt="img"/>
                                        </>
                                        :
                                        <img src={imgUpload} alt="img"/>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <label className='formUpdateLabelUser'>
                        <input
                            className='formUpdateFileInputUser'
                            type='file'
                            multiple
                            id='file'
                            accept='image/,.jpeg,.jpg,.png'
                            placeholder='image file'
                            {...register('avatar', {
                                required: false,
                                onChange: async (event) => {
                                    const formData = new FormData()
                                    const file = event.target.files[0]
                                    formData.append('image', file)
                                    const {data} = await fileUpload({formData, setLoading})
                                    setValue('avatar', data.url)
                                    await setImg(data.url)
                                }
                            })}
                        />
                        {isLoading && isLoading < 99 ? null :
                            <div className='formUpdateViewsElemUser'>
                                <span>Change photo</span>
                                <BiImageAdd/>
                            </div>
                        }
                        {errors.avatar && <h1>{errors.avatar.message}</h1>}
                    </label>
                </div>
            </div>
        </form>
    );
})

export default FormUpdateUser;