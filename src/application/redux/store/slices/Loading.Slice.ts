import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import  type { RootState } from '../Index';


export interface EventState {
    loading: boolean;
    scroll: number;
    processing: Array<string>,
}

const initialState: EventState = {
    loading: false,
    scroll: 0,
    processing: [],
}

// Slice
export const LoadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        set(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        addProcess(state, action: PayloadAction<{ process: string }>) {
            state.processing = [...state.processing, action.payload.process]
        },
        removeProcess(state, action: PayloadAction<{ process: string }>) {
            state.processing = state.processing?.filter((value: string, key: number) => value !== action.payload.process);
        },
        setScrollCounter(state, action: PayloadAction<number>) {
            state.scroll = action.payload
        },
    },
})

// Actions
export const LoadingActions = {
    set: LoadingSlice.actions.set,
    addProcess: LoadingSlice.actions.addProcess,
    removeProcess: LoadingSlice.actions.removeProcess,
    setScrollCounter: LoadingSlice.actions.setScrollCounter,
}

// Selectors
export const isLoading = (state: RootState) => state.loading.loading;

export const scroll = (state: RootState) => state.loading.scroll;

export const processing = (state: RootState) => state.loading.processing;

// Reducer
export default LoadingSlice.reducer