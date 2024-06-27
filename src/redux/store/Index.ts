import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'

import TestSlice from './slices/Test.Slice'
import EnvSlice from './slices/Env.Slice'
import AuthSlice from './slices/Auth.Slice'

import { RootSaga } from './sagas/Root'
import EventSlice from './slices/Event.Slice'


const makeStore = () => {

    const sagaMiddleware = createSagaMiddleware()

    const store = configureStore({
        reducer: {
            tests: TestSlice,
            env:EnvSlice,
            auth:AuthSlice,
            event:EventSlice
        
        },
        devTools: true,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({ thunk: false, 
                serializableCheck: {
                    // Ignore these action types
                    // ignoredActions: [
                        
                    // ],
                    // ignoredPaths: ['socket.socket']
                    
              },
             })
            .concat(sagaMiddleware)
            // .concat(logger),
    })

    sagaMiddleware.run(RootSaga)

    return store
}

export const store = makeStore()

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
