import React, {FC, useMemo, useState} from 'react';
import './skeleton-load.css'


const SkeletonLoad: FC = () => {
    const total = localStorage.getItem('totalNews')
    const skeletonLoad = useMemo(() => (): JSX.Element => {
        return (
            <div className='containerSkeleton'>
                <span className='loaderSkeleton'/>
            </div>
        )
    }, [])

    const [values] = useState(new Array(Number(total)).fill(skeletonLoad()));
    return (
        <div className='containerMapSkeleton'>
            {values.map((skeleton, index) =>
                <div key={index}>{skeleton}</div>
            )}
        </div>

    );
};

export default SkeletonLoad;