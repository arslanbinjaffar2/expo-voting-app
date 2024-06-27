import { useCallback } from 'react'
import {TestActions, SelectAlerts   } from '../slices/Test.Slice'
import { useAppDispatch, useAppSelector } from '../Hooks'



export type AlertServiceOperators = {
    alerts: [],
    FetchAlerts: () => void,

}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseAlertService = (): Readonly<AlertServiceOperators> => {

    const dispatch = useAppDispatch()
    
    return {
    alerts: useAppSelector(SelectAlerts),
      FetchAlerts: useCallback(
        () => {
            dispatch(TestActions.FetchAlerts())
        },
        [dispatch],
    ),  
      
}
}
export default UseAlertService
