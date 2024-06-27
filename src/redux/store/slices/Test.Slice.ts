import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { RootState } from '../Index'

import {
    current
} from '@reduxjs/toolkit';
import { useAppSelector } from '../Hooks';

export interface AlertState {
    test: [],
    
}

const initialState = {
    test:[] as any,
 
}

// Slice
export const AlertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        FetchAlerts() {},
        update:(state,action)=>{
             state.test=action.payload;
        }
       
    },
})

// Actions
export const TestActions = {
    FetchAlerts:AlertSlice.actions.FetchAlerts,  
    update:AlertSlice.actions.update

}


export const SelectAlerts=(state:RootState)=>state.tests.test;



// Reducer
export default AlertSlice.reducer