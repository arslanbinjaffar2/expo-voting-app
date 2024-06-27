import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getAlertApi} from '../api/test.Api'

import { TestActions } from '../slices/Test.Slice'

// import { LoadingActions } from '../slices/Loading.Slice'

import { HttpResponse } from '../../../utils/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchAlerts({
}: {
    type: typeof TestActions.FetchAlerts
}): SagaIterator {
    // yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getAlertApi, {}, state)
     yield put(TestActions.update(response.data))
    //  yield put(LoadingActions.set(false));
}






// Watcher Saga
export function* TestWatcherSaga(): SagaIterator {
    yield takeEvery(TestActions.FetchAlerts, OnFetchAlerts as any)

}

export default TestWatcherSaga