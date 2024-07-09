import { RootState } from '../Index'


import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { Module, SettingModule } from '../../../models/Module'
import { Event ,} from '../../../models/Event';
import AsyncStorageClass from '../../../components/utils/AsyncStorageClass';
// import { CustomHtml } from 'application/models/CustomHtml'



export interface EventState {
    event: Event,
    modules: Array<Module>
    // custom_html: Array<CustomHtml>
    setting_modules: SettingModule[]
    event_url: string
    screen: string,
    // home_events: HomeMyEvent[],
    // upcoming_events: UpcomingEvent[],
    // event_detail: EventDetail|null,
}

const initialState: EventState = {
    event: {},
    modules: [],
    setting_modules: [],
    event_url: '',
    // custom_html: [],
    screen: 'homeMyevents',
    // home_events:[],
    // upcoming_events:[],
    // event_detail: null,
}

// Slice
export const EventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        FetchEvent(state, action: PayloadAction<string>) { },
        FetchEventByCode(state, action: PayloadAction<string>) { },
        update(state, action: PayloadAction<Event>) {
            state.event = action.payload;
            if(action.payload.id !== undefined) {
                AsyncStorageClass.setItem('eventbuizz-active-event-id', action.payload.id);
            } else {
                AsyncStorageClass.removeItem('eventbuizz-active-event-id');
            }
        },
        loadModules(state) { },
        updateModules(state, action: PayloadAction<Array<Module>>) {
            state.modules = action.payload
        },
        loadSettingsModules(state) { },
        updateSettingsModules(state, action: PayloadAction<Array<SettingModule>>) {
            state.setting_modules = action.payload
        },
        SetEventUrl(state, action: PayloadAction<string>) {
            state.event_url = action.payload
        },
        // customHtml(state, action: PayloadAction<Array<CustomHtml>>) {
        //     state.custom_html = action.payload
        // },
        FetchEvents(state, action: PayloadAction<{query: string, screen: string, selected_filter: string }>){
            state.screen = action.payload.screen;
        },
        // UpdateEvents(state, action: PayloadAction<HomeMyEvent[]>) {
        //     if(action.payload !== undefined){
        //         state.home_events = action.payload;
        //     }
        // },
        // UpdateUpcomingEvents(state, action: PayloadAction<UpcomingEvent[]>) {
        //     if(action.payload !== undefined){
        //         state.upcoming_events = action.payload;
        //     }
        // },
        // updateEventDetail(state, action: PayloadAction<{ detail: EventDetail }>) {
        //     if(action.payload.detail !== undefined){
        //         state.event_detail = action.payload.detail;
        //     }
        //  },
        // FetchEventDetail(state, action: PayloadAction<{ id: number }>) {
        // },
    },
})

// Actions
export const EventActions = {
    FetchEvent: EventSlice.actions.FetchEvent,
    FetchEventByCode: EventSlice.actions.FetchEventByCode,
    update: EventSlice.actions.update,
    loadModules: EventSlice.actions.loadModules,
    updateModules: EventSlice.actions.updateModules,
    loadSettingsModules: EventSlice.actions.loadSettingsModules,
    updateSettingsModules: EventSlice.actions.updateSettingsModules,
    SetEventUrl: EventSlice.actions.SetEventUrl,
    // customHtml: EventSlice.actions.customHtml,
    FetchEvents: EventSlice.actions.FetchEvents,
    // UpdateEvents: EventSlice.actions.UpdateEvents,
    // UpdateUpcomingEvents: EventSlice.actions.UpdateUpcomingEvents,
    // updateEventDetail: EventSlice.actions.updateEventDetail,
    // FetchEventDetail: EventSlice.actions.FetchEventDetail,
}

// Selectors
export const SelectEvent = (state: RootState) => state.event.event
export const Modules = (state: RootState) => state.event.modules
export const CustomHtmls = (state: RootState) => state.event.custom_html

export const SettingModules = (state: RootState) => state.event.setting_modules
export const SelectHomeEvents = (state: RootState) => state.event.home_events
export const SelectUpcomingEvents = (state: RootState) => state.event.upcoming_events
export const SelectHomeEventDetail = (state: RootState) => state.event.event_detail

export const SelectEventUrl = (state: RootState) => state.event.event_url

// Reducer
export default EventSlice.reducer