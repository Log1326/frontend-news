import React, {memo} from 'react';
import './search-load.css'
const SearchLoad = memo(() => {
    return (
        <div className='containerSearchLoad'>
            <span className='loaderSearch'/>
        </div>
    );
})

export default SearchLoad;