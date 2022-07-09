import React, {FC} from 'react';
import './button.css'
import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from 'react-icons/bs'

interface Props {
    children: React.ReactNode
    NextOrPrev: string
}

const ButtonNext: FC<Props> = ({children, NextOrPrev}) => {
    return <button className='buttonClassName'>
        {NextOrPrev && NextOrPrev === 'next' ?
            <>
                {children}
                <span className='buttonClassNameSpanRight'>
                      <BsFillArrowRightCircleFill/>
                </span>
            </>

            :
            <>
                <span className='buttonClassNameSpanLeft'>
                     <BsFillArrowLeftCircleFill/>
                 </span>
                {children}
            </>
        }

    </button>
};

export default ButtonNext;