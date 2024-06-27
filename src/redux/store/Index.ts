import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import EnvSlice from './slices/Env.Slice';
import AuthSlice from './slices/Auth.Slice';
import EventSlice from './slices/Event.Slice';

import { RootSaga } from './sagas/Root';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    env: EnvSlice,
    auth: AuthSlice,
    event: EventSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: persistedReducer,
        devTools: true,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                // Ignore redux-persist actions
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/REGISTER',
                    'persist/FLUSH'
                ],
            },
        }).concat(sagaMiddleware),
    });

    sagaMiddleware.run(RootSaga);

    const persistor = persistStore(store);

    return { store, persistor };
};

export const { store, persistor } = makeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
