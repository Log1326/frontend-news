import React, {FC, FormEvent, useEffect, useState,} from 'react';
import './newsform.css'
import {SubmitHandler, useForm} from 'react-hook-form'
import {IPublishNews} from "../../store/news/types";
import {BiImageAdd} from 'react-icons/bi'
import {fileUpload} from "../../service/api";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

interface Props {
    onSubmit: SubmitHandler<IPublishNews>
}

const NewsForm: FC<Props> = ({onSubmit}) => {
    const [img, setImg] = useState<string>('')
    const [isLoading, setLoading] = useState<number | null>(null)

    const {register, handleSubmit, formState: {errors}, reset, setFocus, setValue} = useForm<IPublishNews>({
        mode: 'onBlur'
    })
    useEffect(() => {
        setFocus('title')
    }, [])

    return (
        <>
            <div className='addTourText'>Add News</div>
            <form className='formTourContainer' onSubmit={(e: FormEvent) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder={'title'}
                    {...register('title',
                        {required: {value: true, message: 'title is empty'}})}
                />
                {errors.title && <p>{errors.title.message}</p>}

                <textarea
                    placeholder='description'
                    {...register('description', {required: {value: true, message: 'description is empty'}})}
                />
                {errors.description && <p>{errors.description.message}</p>}

                <input
                    type='text'
                    placeholder='tags'
                    {...register('tags',
                        {required: false})}
                />

                {isLoading && isLoading < 99 ?
                        <CircularProgressbar
                            strokeWidth={10}
                            backgroundPadding={10}
                            background
                            styles={buildStyles({
                                textSize:'30px',
                                backgroundColor: "#f0e6ea",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                            })}
                            className={'loading'}
                            value={isLoading} text={`${isLoading}%`}/>
                    :
                    <label className='labelFile'>
                        <input
                            className='inputFile'
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
                                    setImg(file.name)
                                    formData.append('image', file)
                                    const {data} = await fileUpload({formData, setLoading})
                                    setValue('imageUrl', data.url)
                                }
                            })}
                        />
                        <div className='choosePhotos'>
                            <p>{img ? img : <span>Choose photos</span>}</p>
                            <BiImageAdd/>
                        </div>
                    </label>
                }
                <div className='formTourButton'>
                    <button className='btn-one' type='submit' onClick={handleSubmit(onSubmit)}>
                        publish
                    </button>
                    <button className='btn-two' onClick={() => reset()}>
                        clear
                    </button>
                </div>
            </form>
        </>

    );
};

export default NewsForm;