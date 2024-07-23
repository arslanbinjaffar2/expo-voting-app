import { useCallback } from 'react'
import { EventActions, Modules, SelectEvent, SelectEventUrl, SettingModules } from '@redux/store/slices/Event.Slice'
import { useAppDispatch, useAppSelector } from '@redux/store/Hooks'
import { Module, SettingModule } from '@application/models/Module'
import {Event} from '@application/models/Event'




export type EventServiceOperators = {
    event: Event
    modules: Array<Module>
    // custom_html: Array<CustomHtml>
    setting_modules: SettingModule[]
    event_url: string
    // home_events: HomeMyEvent[]
    // upcoming_events: UpcomingEvent[]
    // event_detail: EventDetail|null,
    FetchEvent: (slug: string) => void
    FetchEventByCode: (code: string) => void
    loadModules: () => void
    loadSettingsModules: () => void
    SetEventUrl: (event_url: string) => void
    FetchEvents: (payload: {query: string, screen: string,selected_filter: string }) => void
    // FetchEventDetail: (payload: { id: number }) => void
}

/**
 * EventService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseEventService = (): Readonly<EventServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        event: useAppSelector(SelectEvent),
        modules: useAppSelector(Modules),
        // custom_html: useAppSelector(CustomHtmls),
        setting_modules: useAppSelector(SettingModules),
        event_url: useAppSelector(SelectEventUrl),
        // home_events:useAppSelector(SelectHomeEvents),
        // upcoming_events:useAppSelector(SelectUpcomingEvents),
        // event_detail: useAppSelector(SelectHomeEventDetail),
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
        loadModules: useCallback(
            () => {
                dispatch(EventActions.loadModules())
            },
            [dispatch],
        ),
        loadSettingsModules: useCallback(
            () => {
                dispatch(EventActions.loadSettingsModules())
            },
            [dispatch],
        ),
        SetEventUrl: useCallback(
            (event_url: string) => {
                dispatch(EventActions.SetEventUrl(event_url))
            },
            [dispatch],
        ),
        FetchEvents: useCallback(
            (payload: {query: string, screen: string,selected_filter: string }) => {
                dispatch(EventActions.FetchEvents(payload))
            },
            [dispatch],
        ),
        // FetchEventDetail: useCallback(
        //     (payload: { id: number }) => {
        //         dispatch(EventActions.FetchEventDetail(payload))
        //     },
        //     [dispatch],
        // ),
    }
}
