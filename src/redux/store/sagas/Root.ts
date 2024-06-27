import { all, fork } from 'redux-saga/effects'

import { TestWatcherSaga } from './test.Saga'

import {EventWatcherSaga} from './Event.Saga'

export function* RootSaga() {
    yield all([
                fork(TestWatcherSaga), 
                fork(EventWatcherSaga)
        
            ])
}

export default RootSaga