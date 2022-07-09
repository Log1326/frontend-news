import React, {FC} from 'react';
import './nonews.css'

interface Props {
    children: React.ReactNode
    searchQuery?: string | null
}

const NoNews: FC<Props> = ({children, searchQuery}) => {
    return (
        <div className='noNews'>
            {children}
            {searchQuery && <span>{`"${searchQuery}"`}</span>}
        </div>
    );
};

export default NoNews;