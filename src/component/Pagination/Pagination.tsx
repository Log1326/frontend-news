import React, {FC, memo} from 'react';
import './pagination.css'
import {AppDispatch} from "../../store/store";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import './pagination.css'
import ButtonNext from "../../ui/VariableButton/ButtonNext";
import {IOptions} from "../../store/news/types";

interface Props {
    setCurrentPage: ActionCreatorWithPayload<number>
    options: IOptions,
    dispatch: AppDispatch
}

const Pagination: FC<Props> = memo(({dispatch, setCurrentPage, options: {numberOfPages, currentPage}}) => {

    const renderPagination = () => {
        if (numberOfPages === 0) return null
        if (currentPage === numberOfPages && currentPage === 1) return null
        if (currentPage === 1) {
            return (
                <div>
                    <span onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
                        <ButtonNext NextOrPrev={'next'}>Next</ButtonNext>
                    </span>
                </div>
            )
        } else if (currentPage && currentPage !== numberOfPages) {
            return (
                <div className='NextAndPrevPosition'>
                    <span onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
                        <ButtonNext NextOrPrev={'prev'}>Prev</ButtonNext>
                    </span>
                    <span onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
                        <ButtonNext NextOrPrev={'next'}>Next</ButtonNext>
                    </span>
                </div>
            )
        } else {
            return (
                <div>
                    {currentPage &&
                        <span onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
                        <ButtonNext NextOrPrev={'prev'}>Prev</ButtonNext>
                    </span>}
                </div>
            )
        }
    }
    return renderPagination()
})

export default Pagination;