'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/index';
import { addOne, substractOne, initCounterState } from '@/src/store/counter/counterSlice';

interface Props {
    value?: number;
}



export interface CounterResponse {
    method: string;
    count:  number;
}

const getApiCounter = async(): Promise<CounterResponse> => {
    const data = await fetch('/api/counter').then( res => res.json() );
    console.log({data})
    return data
}

export const CarCounter = ({ value = 0 }: Props) => {

    const count = useAppSelector( state => state.counter.count);
    const dispatch = useAppDispatch();

    // useEffect (() => {
    //     dispatch( initCounterState(value) );
    // }, [dispatch, value]);

    useEffect(() => {
        getApiCounter()
            .then( ({count}) => dispatch( initCounterState(count) ));
    }, [dispatch])
    
    return (
        <>
            <span className="text-9xl font-bold">{count}</span>

            <div className="flex items-center justify-center">
                <button
                    onClick={() => dispatch( addOne() )}
                    className="felx items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
                    +1
                </button>

                <button
                    onClick={() => dispatch( substractOne() )}
                    className="felx items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
                    -1
                </button>
            </div>
        </>
    )
}

