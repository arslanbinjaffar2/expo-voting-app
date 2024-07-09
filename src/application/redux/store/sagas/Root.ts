import { all, fork } from 'redux-saga/effects'

import { TestWatcherSaga } from './test.Saga'

import {EventWatcherSaga} from './Event.Saga'
import AuthWatcherSaga from './Auth.Saga'
import {SurveyWatcherSaga} from './Survey.Saga'
export function* RootSaga() {
    yield all([
                fork(TestWatcherSaga), 
                fork(AuthWatcherSaga),
                fork(EventWatcherSaga),
                fork(SurveyWatcherSaga)
            ])
}

export default RootSaga