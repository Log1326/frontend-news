import React, {FC} from 'react';
import './nonews.css'

interface Props {
    children: React.ReactNode
}

const NoNews: FC<Props> = ({children}) => {
    return (
        <div className='noNews'>
            {children}
        </div>
    );
};

export default NoNews;