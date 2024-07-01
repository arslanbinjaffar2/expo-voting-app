import { RootState } from '../Index'
import { GeneralResponse } from '../../../utils/GeneralResponse';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAction } from '@reduxjs/toolkit';
import AsyncStorageClass from '../../../utils/AsyncStorageClass';
import { Platform } from 'react-native';
interface SessionState{
  remainTime:number,
  isRunning:boolean
}

const initialState: SessionState = {
  remainTime: 59,
  isRunning: false,
};


const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      if (state.remainTime <=0) {
        state.isRunning = false;
        state.remainTime =59;
      }
    },
    tick: (state) => {
      if (state.remainTime > 0) {
        state.remainTime -= 1;
      }
    },
    addMoreTime:(state)=>{
      if (state.remainTime > 0) {
        state.remainTime += 5;
      }
    }
  },
});

const { startTimer, stopTimer, tick,addMoreTime } = timerSlice.actions;
export const timerAction={
  startTimer,
  stopTimer,
  tick,
  addMoreTime
} 
export const selectRemainTime=((state:RootState)=>state.timer.remainTime)
export default timerSlice.reducer;

