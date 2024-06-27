import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../Index'
import { GeneralResponse } from '../../../utils/GeneralResponse';
import AsyncStorageClass from '../../../utils/AsyncStorageClass';


export interface EventState {
    event: Event,

}

const initialState: EventState = {
    event: {} as any,

}

// Slice
export const EventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        FetchEvent(state, action: PayloadAction<string>) { },
        update(state, action: PayloadAction<any>) {
            state.event = action.payload;
            if(action.payload.id !== undefined) {
                AsyncStorageClass.setItem('eventbuizz-active-event-id', action.payload.id);
            } else {
                AsyncStorageClass.removeItem('eventbuizz-active-event-id');
            }
        },
    },
})

// Actions
export const EventActions = {
    FetchEvent: EventSlice.actions.FetchEvent,
    update: EventSlice.actions.update,
   
}

// Selectors
export const SelectEvent = (state: RootState) => state.event.event


// Reducer
export default EventSlice.reducer