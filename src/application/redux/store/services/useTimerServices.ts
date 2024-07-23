import {timerAction  } from '@redux/store/slices/timer.Slice'

import { selectRemainTime } from '@redux/store/slices/timer.Slice'

import { useAppDispatch, useAppSelector } from '@redux/store/Hooks'

import { useCallback } from 'react'

export type LoadingServiceOperators = {
    RemainTime:number,
    setStartRemainTime:()=>void
    setStopRemainTime:()=>void
    setAddMoreRemainTime:()=>void
}

/**
 * LoadingService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseLoadingService = (): Readonly<LoadingServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        RemainTime: useAppSelector(selectRemainTime),
        setStartRemainTime: useCallback(
            () => {
                dispatch(timerAction.startTimer())
            },
            [dispatch],
        ), 
        setStopRemainTime:useCallback(
            () => {
                dispatch(timerAction.stopTimer())
            },
            [dispatch],
        ), 
        setAddMoreRemainTime:useCallback(
            () => {
                dispatch(timerAction.addMoreTime())
            },
            [dispatch],
        ), 

    }
}

export default UseLoadingService