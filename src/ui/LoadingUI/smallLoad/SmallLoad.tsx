import React, {FC, memo} from 'react';
import './loading-style.css'


const SmallLoad:FC = () => {
    return (
        <div className='containerLoadSmall'>
            <span className='loader'/>
        </div>
    );
}

export default memo(SmallLoad);