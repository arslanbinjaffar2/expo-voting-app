import { isLoading, scroll, processing } from '../slices/Loading.Slice'

import { LoadingActions } from '../slices/Loading.Slice'

import { EventActions, SelectEvent } from '../slices/Event.Slice'
import { useAppDispatch, useAppSelector } from '../Hooks'

import { useCallback } from 'react'

export type LoadingServiceOperators = {
    loading: boolean,
    processing: Array<string>,
    scroll: number,
    setScrollCounter: (counter: number) => void,
    setLoading: (counter: boolean) => void
    setAddProcess:(process:string)=>void
    setRemoveProcess:(process:string)=>void
}

/**
 * LoadingService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseLoadingService = (): Readonly<LoadingServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        loading: useAppSelector(isLoading),
        scroll: useAppSelector(scroll),
        processing: useAppSelector(processing),
        setScrollCounter: useCallback(
            (counter: number) => {
                dispatch(LoadingActions.setScrollCounter(counter))
            },
            [dispatch],
        ),
        setLoading: useCallback(
            (counter: boolean) => {
                dispatch(LoadingActions.set(counter))
            },
            [dispatch],
        ),
        setAddProcess:useCallback(
            (process:string)=>{
           dispatch(LoadingActions.addProcess({process}))
            },
            [dispatch]
        ),
        setRemoveProcess:useCallback(
            (process:string)=>{
           dispatch(LoadingActions.removeProcess({process}))
            },
            [dispatch]
        )
    }
}

export default UseLoadingService