import { all, fork } from 'redux-saga/effects'

import { TestWatcherSaga } from './test.Saga'

import {EventWatcherSaga} from './Event.Saga'
import AuthWatcherSaga from './Auth.Saga'

export function* RootSaga() {
    yield all([
                fork(TestWatcherSaga), 
                fork(AuthWatcherSaga),
                fork(EventWatcherSaga)
        
            ])
}

export default RootSaga