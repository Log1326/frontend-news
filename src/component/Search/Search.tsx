import React, {FC} from 'react';
import './search.css'
import {AiOutlineSearch} from 'react-icons/ai'

interface Props {
    search: string
    setSearch: (e: string) => void,
    handleSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Search: FC<Props> = ({search, handleSubmit, setSearch}) => {

    return (
        <div className='containerSearch'>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='inputSearch'
                type="text"
                placeholder={'Search'}
                onKeyPress={handleSubmit}
            />
            <span onClick={() => alert(' you may just to click enter')}><AiOutlineSearch/></span>
        </div>
    );
};

export default Search;