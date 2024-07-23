import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getCheckVotingPermissionApi, getMySurveyResultApi, getMySurveyResultDetailApi, getSurveyApi, getSurveyDetailApi, submitSurveyApi } from '@redux/store/api/Survey.Api'

import { SurveyActions } from '@redux/store/slices/Survey.Slice'

import { LoadingActions } from '@redux/store/slices/Loading.Slice'


import { select } from 'redux-saga/effects';

import { SurveySubmitData } from '@application/models/survey/Survey'
import { HttpResponse } from '@application/components/utils'
// import { NotificationActions } from '../slices/Notification.Slice'

function* OnFetchSurveys({
}: {
    type: typeof SurveyActions.FetchSurveys
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSurveyApi, {}, state)
    yield put(SurveyActions.update({ surveys: response.data.data.surveys.pending_surveys!, completed_surveys:response.data.data.surveys.completed_surveys, survey_settings:response.data.data.surveySettings, survey_labels:response.data.data.survey_labels}))
    yield put(LoadingActions.set(false));
}

function* OnFetchSurveyDetail({
    payload,
}: {
    type: typeof SurveyActions.FetchSurveyDetail
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSurveyDetailApi, payload, state)
    yield put(SurveyActions.updateDetail({ detail: response.data.data.survey!, survey_labels: response.data.data.survey_labels  }))
    yield put(LoadingActions.set(false));
}


function* OnSurveySubmit({
    payload,
}: {
    type: typeof SurveyActions.SubmitSurvey
    payload: SurveySubmitData
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(submitSurveyApi, payload, state)
    console.log(response);
    if (response?.status === 200) {
        yield put(SurveyActions.SurveySubmitSuccess())
    }
}

function* OnFetchMySurveyResults({
}: {
    type: typeof SurveyActions.FetchMySurveyResults
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMySurveyResultApi, {}, state)
    yield put(SurveyActions.updateMySurveyResults({ mySurveyResult: response.data.data.surveys, survey_labels: response.data.data.survey_labels, survey_settings: response.data.data.surveySettings }))
    yield put(LoadingActions.set(false))

}

function* OnFetchMySurveyResultDetail({
    payload,
}: {
    type: typeof SurveyActions.FetchMySurveyResultDetail
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMySurveyResultDetailApi, payload, state)
    yield put(SurveyActions.updateMySurveyResultDetail({ detail: response.data.data.survey_detail!, survey_labels: response.data.data.survey_labels, survey_settings: response.data.data.surveySettings }))
    console.log('total_points_survey',response.data.data.survey_detail?.total_points)
    yield put(LoadingActions.set(false));
}

function* OnCheckVotingPermission({
    payload,
}: {
    type: typeof SurveyActions.checkVotingPermission
    payload: { data:any}
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getCheckVotingPermissionApi, payload, state)
    if(response.data.data.votingPermission  && payload.data.inactive == 0){
        console.log('adding to notifs')
        // yield put(NotificationActions.addNotification({
        //     notification:{
        //         type:'survey',
        //         title:response?.data?.data?.survey_labels?.POLL_SURVEY_MESSAGE,
        //         text:response?.data?.data?.survey_labels?.POLL_SURVEY_NEW_SURVEY_AVAILABLE,
        //         url:`/survey/detail/${payload?.data?.survey_id}`,
        //         survey_id:payload?.data?.survey_id,
        //         date:moment().format('L'),
        //         time:moment().format('HH:mm'),
        //         btnLeftText:state?.event?.event?.labels?.GENERAL_OK,
        //         btnRightText:state?.event?.event?.labels?.GENERAL_DETAIL,
        //     }
        // }))
    }
}

// Watcher Saga
export function* SurveyWatcherSaga(): SagaIterator {
    yield takeEvery(SurveyActions.FetchSurveys.type, OnFetchSurveys as any)
    yield takeEvery(SurveyActions.FetchSurveyDetail.type, OnFetchSurveyDetail as any)
    yield takeEvery(SurveyActions.SubmitSurvey.type, OnSurveySubmit as any)
    yield takeEvery(SurveyActions.FetchMySurveyResults.type, OnFetchMySurveyResults as any)
    yield takeEvery(SurveyActions.FetchMySurveyResultDetail.type, OnFetchMySurveyResultDetail as any)
    yield takeEvery(SurveyActions.checkVotingPermission.type, OnCheckVotingPermission as any) 
}

export default SurveyWatcherSaga