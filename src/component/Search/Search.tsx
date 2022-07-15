import React, {FC, memo, useCallback} from 'react';
import './search.css'
import {AiOutlineSearch} from 'react-icons/ai'

interface Props {
    search: string
    setSearch: (e: string) => void,
    handleSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Search: FC<Props> = memo(({search, handleSubmit, setSearch}) => {
    const onChange = useCallback((e: any) => setSearch(e.target.value), [setSearch])
    return (
        <div className='containerSearch'>
            <input
                value={search}
                onChange={onChange}
                className='inputSearch'
                type="text"
                placeholder={'Search'}
                onKeyPress={handleSubmit}
            />
            <span onClick={() => alert(' you may just to click enter')}><AiOutlineSearch/></span>
        </div>
    );
})

export default Search;