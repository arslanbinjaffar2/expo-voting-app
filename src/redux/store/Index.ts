// store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import EnvSlice from './slices/Env.Slice';
import AuthSlice from './slices/Auth.Slice';
import EventSlice from './slices/Event.Slice';
import LoadingSlice from './slices/Loading.Slice';
import timerSlice from './slices/timer.Slice';

import { RootSaga } from './sagas/Root';
import timerMiddleware from './middlewares/timerMiddleware';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  env: EnvSlice,
  auth: AuthSlice,
  event: EventSlice,
  loading: LoadingSlice,
  timer: timerSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = (): { store: any, persistor: any }=> {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          // Ignore redux-persist actions
          ignoredActions: [
            'persist/PERSIST',
            'persist/REHYDRATE',
            'persist/PAUSE',
            'persist/PURGE',
            'persist/REGISTER',
            'persist/FLUSH',
          ],
        },
      }).concat(sagaMiddleware, timerMiddleware),
  });

  sagaMiddleware.run(RootSaga);

  const persistor = persistStore(store);

  return { store, persistor };
};

export const { store, persistor } = makeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
