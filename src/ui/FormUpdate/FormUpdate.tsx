import React, {FC, useEffect, useMemo, useState} from 'react';
import './formupdate.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {INews, IPublishNews} from "../../store/news/types";
import {_url, fileUpload} from "../../service/api";
import {BiImageAdd} from "react-icons/bi";
import {excerpt} from "../../utils";
import {useNavigate} from "react-router-dom";
import imgUpload from '../../accept/imgUpload.png'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
    onSubmit: SubmitHandler<IPublishNews>
    items: INews[]
    id?: string
}

const FormUpdate: FC<Props> = ({onSubmit, items, id}) => {
    const [img, setImg] = useState<string>('')
    const [isLoading, setLoading] = useState<number | null>(null)
    const findItem = useMemo(() => items.find(el => el._id === id), [items])
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors},
        setFocus,
        reset,
        setValue
    } = useForm<IPublishNews>({
        mode: 'onChange',
        defaultValues: {
            title: findItem?.title || '',
            description: excerpt(String(findItem?.description), 150) || '',
            tags: findItem?.tags.toString() || '',
            imageUrl: findItem?.imageUrl,
        }
    })
    useEffect(() => {
        setFocus('title')
    }, [])

    useEffect(() => {
        !findItem && navigate(-1)
        findItem?.imageUrl && setImg(findItem?.imageUrl)
    }, [findItem])
    const handleClear = () => reset()

    return (
        <div className='formUpdateGiveWidth'>
            <form onSubmit={e => e.preventDefault()}>
                <div className='containerFormUpdate'>
                    <div className='formUpdateControlField'>
                        <div className='formUpdateFiled'>
                            <p>Title</p>
                            <input
                                className='formUpdateInput'
                                type="text"
                                placeholder='Title...'
                                {...register('title', {required: {value: true, message: 'Title is required'}})}
                            />
                            {errors.title && <h1>{errors.title.message}</h1>}
                        </div>
                        <div className='formUpdateTextAria'>
                            <p>Description</p>
                            <textarea
                                className='formUpdateTextAriaField'
                                placeholder='Description...'
                                {...register('description', {
                                    required: {
                                        value: true,
                                        message: 'description is required'
                                    }
                                })}
                            />
                            {errors.description && <h1>{errors.description.message}</h1>}
                        </div>

                        <div className='formUpdateFiled'>
                            <p>Tags</p>
                            <input
                                className='formUpdateInput'
                                type="text"
                                placeholder='tags'
                                {...register('tags',
                                    {required: false})}/>
                        </div>

                        <div className='containerButtons'>
                            <button type='submit' onClick={handleSubmit(onSubmit)}>Update</button>
                            <button onClick={handleClear}>Clear</button>
                        </div>
                    </div>
                    {/*===================================*/}
                    <div>
                        <div>
                            {isLoading && isLoading < 99 ?
                                <div className='circleProgressbar'>
                                    <CircularProgressbar
                                        background
                                        backgroundPadding={6}
                                        styles={buildStyles({
                                            backgroundColor: "#f0e6ea",
                                            textColor: "#fff",
                                            pathColor: "#fff",
                                            trailColor: "transparent"
                                        })}
                                        value={isLoading} text={`${isLoading}%`}/>;
                                </div>
                                :
                                <div>
                                    <div className='formUpdateImgAndButton'>
                                        {img ?
                                            <>
                                                <button className='test' onClick={() => setImg('')}>X</button>
                                                <img src={_url + img} alt="img"/>
                                            </>
                                            :
                                            <img src={imgUpload} alt="img"/>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <label className='formUpdateLabel'>
                            <input
                                className='formUpdateFileInput'
                                type='file'
                                multiple
                                id='file'
                                accept='image/,.jpeg,.jpg,.png'
                                placeholder='image file'
                                {...register('imageUrl', {
                                    required: false,
                                    onChange: async (event) => {
                                        const formData = new FormData()
                                        const file = event.target.files[0]
                                        formData.append('image', file)
                                        const {data} = await fileUpload({formData, setLoading})
                                        setValue('imageUrl', data.url)
                                        await setImg(data.url)
                                    }
                                })}
                            />
                            {isLoading && isLoading < 99 ? null :
                                <div className='formUpdateViewsElem'>
                                    <span>Change photo</span>
                                    <BiImageAdd/>
                                </div>
                            }
                            {errors.imageUrl && <h1>{errors.imageUrl.message}</h1>}
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormUpdate;