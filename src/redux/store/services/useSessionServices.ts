import { selectIsExpireTime } from '../slices/Session.Slice'

import { SessionActions } from '../slices/Session.Slice'

import { useAppDispatch, useAppSelector } from '../Hooks'

import { useCallback } from 'react'

export type LoadingServiceOperators = {
    expireTime:number,
    setcheckExpireTime:(time:number)=>void
    setAddMoreExpireTime:(time:number)=>void
}

/**
 * LoadingService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseLoadingService = (): Readonly<LoadingServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        expireTime: useAppSelector(selectIsExpireTime),
        setcheckExpireTime: useCallback(
            (time: number) => {
                dispatch(SessionActions.checkExpireTime(time))
            },
            [dispatch],
        ), 
        setAddMoreExpireTime:useCallback(
            (time: number) => {
                dispatch(SessionActions.addMoreExpireTime(time))
            },
            [dispatch],
        ), 
    }
}

export default UseLoadingService