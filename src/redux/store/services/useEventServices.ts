import { useCallback } from 'react'
import { EventActions, SelectEvent } from '../slices/Event.Slice'
import { useAppDispatch, useAppSelector } from '../Hooks'





export type EventServiceOperators = {
    event: Event
    FetchEvent: (slug: string) => void
    FetchEventByCode: (code: string) => void
}

/**
 * EventService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseEventService = (): Readonly<EventServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        event: useAppSelector(SelectEvent),
        FetchEvent: useCallback(
            (slug: string) => {
                dispatch(EventActions.FetchEvent(slug))
            },
            [dispatch],
        ),
        FetchEventByCode: useCallback(
            (code: string) => {
                dispatch(EventActions.FetchEventByCode(code))
            },
            [dispatch],
        ),
 
    }
}


export default UseEventService