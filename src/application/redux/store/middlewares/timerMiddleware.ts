// timerMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import {AuthActions} from '../slices/Auth.Slice';
import type { RootState } from '../Index'
import {timerAction} from '../slices/timer.Slice';
const timerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (timerAction.startTimer.match(action)) {
    const intervalId = setInterval(() => {
      const state = store.getState();
      if (state.timer.remainTime <= 0) {
        clearInterval(intervalId);
        store.dispatch(AuthActions.clearToken()); 
        store.dispatch(timerAction.stopTimer());
      } else {
        store.dispatch(timerAction.tick());
      }
    }, 1000);

    (store as any).intervalId = intervalId;
  }

  if (timerAction.stopTimer.match(action)) {
    clearInterval((store as any).intervalId);
  }

  return next(action);
};

export default timerMiddleware;
