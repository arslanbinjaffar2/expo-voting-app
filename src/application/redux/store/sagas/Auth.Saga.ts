import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getLoginApi } from '@redux/store/api/Auth.Api';

import { LoginPayload, AuthActions } from '@redux/store/slices/Auth.Slice';


import { HttpResponse } from '@application/components/utils/GeneralResponse'

import { select } from 'redux-saga/effects';
import { LoadingActions } from '@redux/store/slices/Loading.Slice';

// Worker Sagas handlers
function* OnLogin({
    payload,
}: {
    type: typeof AuthActions.login
    payload: LoginPayload
}): SagaIterator {
    try {
        yield put(LoadingActions.addProcess({ process: 'login-attendee' }))
        const state = yield select(state => state);
        const response: HttpResponse = yield call(getLoginApi, payload, state);
        if (response.data.success) {
            yield put(AuthActions.success(response.data));
        } else {
            yield put(AuthActions.failed(response.data.message!));
        }
        yield put(LoadingActions.removeProcess({ process: 'login-attendee' }))
    } catch (error: any) {
        yield put(LoadingActions.removeProcess({ process: 'login-attendee' }))
        yield put(AuthActions.failed(error.message));
    }
}

// function* OnPasswordReset({
//     payload,
// }: {
//     type: typeof AuthActions.login
//     payload: PasswordResetPayload
// }): SagaIterator {
//     try {
//         const state = yield select(state => state);
//         const response: HttpResponse = yield call(getPasswordResetApi, payload, state);
//         if (response.data.success) {
//             yield put(AuthActions.success(response.data));
//         } else {
//             yield put(AuthActions.failed(response.data.message!));
//         }
//     } catch (error: any) {
//         yield put(AuthActions.failed(error.message));
//     }
// }

// function* OnChooseProvider({
//     payload,
// }: {
//     type: typeof AuthActions.login
//     payload: ChooseProviderPayload
// }): SagaIterator {
//     try {
//         const state = yield select(state => state);
//         const response: HttpResponse = yield call(getChooseProviderApi, payload, state);
//         if (response.data.success) {
//             yield put(AuthActions.success(response.data));
//         } else {
//             yield put(AuthActions.failed(response.data.message!));
//         }
//     } catch (error: any) {
//         yield put(AuthActions.failed(error.message));
//     }
// }

// function* OnReset({
//     payload,
// }: {
//     type: typeof AuthActions.login
//     payload: ResetPayload
// }): SagaIterator {
//     try {
//         const state = yield select(state => state);
//         const response: HttpResponse = yield call(getResetApi, payload, state);
//         if (response.data.success) {
//             yield put(AuthActions.success(response.data));
//         } else {
//             yield put(AuthActions.failed(response.data.message!));
//         }
//     } catch (error: any) {
//         yield put(AuthActions.failed(error.message));
//     }
// }



// Watcher Saga
export function* AuthWatcherSaga(): SagaIterator {
    yield takeEvery(AuthActions.login.type, OnLogin as any)
    // yield takeEvery(AuthActions.passwordReset.type, OnPasswordReset)
    // yield takeEvery(AuthActions.chooseProvider.type, OnChooseProvider)
    // yield takeEvery(AuthActions.reset.type, OnReset)
    // yield takeEvery(AuthActions.verification.type, OnVerification)
    // yield takeEvery(AuthActions.loadProvider.type, OnLoadProvider)
    // yield takeEvery(AuthActions.getUser.type, OnGetUser)
    // yield takeEvery(AuthActions.logout.type, OnLogout)
}

export default AuthWatcherSaga