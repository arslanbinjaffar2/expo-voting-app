import { RootState } from '../Index'
import { GeneralResponse } from '../../../utils/GeneralResponse';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAction } from '@reduxjs/toolkit';
import AsyncStorageClass from '../../../utils/AsyncStorageClass';
import { Platform } from 'react-native';
interface SessionState{
    expireTime:number,
    error:''
}

const initialState: SessionState = {
    expireTime:0,
    error: '',
};

const SessionSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      checkExpireTime:(state,action: PayloadAction<number>)=>{
        state.expireTime=action.payload
      },
      addMoreExpireTime:(state,action: PayloadAction<number>)=>{
        state.expireTime=state.expireTime+action.payload;
      },
    },
});

// Actions
export const SessionActions = {
    checkExpireTime: SessionSlice.actions.checkExpireTime,
    addMoreExpireTime:SessionSlice.actions.addMoreExpireTime
}
// Selectors
export const selectIsExpireTime = (state: RootState) => state.session.expireTime;


// Reducer
const sessionReducer = SessionSlice.reducer;

export default sessionReducer;