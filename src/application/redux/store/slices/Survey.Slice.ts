import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Survey, SurveyLabels, Surveys,  SurveySetting, SurveySubmitData} from '../../../models/survey/Survey'


import { RootState } from '../Index'

import {
    current
} from '@reduxjs/toolkit';
import { SurveyDetail } from '../../../models/survey/Detail';
import { MySurveyResult, MySurveyResultSurvey } from '../../../models/survey/ResultDetail';

export interface SurveyState {
    surveys: Surveys,
    completed_surveys: Surveys,
    detail: SurveyDetail | null,
    survey_settings:SurveySetting | null,
    survey_labels:SurveyLabels
    submitSuccess:boolean,
    mySurveyResult: Surveys,
    mySurveyResultDetail: MySurveyResultSurvey | null,
    mySurveyResultScore:number,
    mySurveyTotalScore:number,
}

const initialState: SurveyState = {
    surveys: [],
    completed_surveys: [],
    survey_settings:null,
    detail: null,
    survey_labels:{},
    submitSuccess:false,
    mySurveyResult: [],
    mySurveyResultDetail:null,
    mySurveyResultScore:0,
    mySurveyTotalScore:0,
}

// Slice
export const SurveySlice = createSlice({
    name: 'surveys',
    initialState,
    reducers: {
        FetchSurveys() {},
        update(state, action: PayloadAction<{ surveys: Surveys, completed_surveys: Surveys, survey_settings:SurveySetting, survey_labels:SurveyLabels }>) {
            state.surveys = action.payload.surveys;
            state.completed_surveys = action.payload.completed_surveys;
            state.survey_settings = action.payload.survey_settings;
            state.survey_labels = action.payload.survey_labels;
            state.submitSuccess = false
        },
        FetchSurveyDetail(state, action: PayloadAction<{ id: number }>) { },
        updateDetail(state, action: PayloadAction<{ detail: SurveyDetail, survey_labels:SurveyLabels }>) {
            state.detail = action.payload.detail;
            state.survey_labels = action.payload.survey_labels;
        },
        SubmitSurvey(state, action: PayloadAction<SurveySubmitData>){
            state.submitSuccess = false
        },
        SurveySubmitSuccess(state){
            state.submitSuccess = true
        },
        FetchMySurveyResults() {},
        updateMySurveyResults(state, action: PayloadAction<{ mySurveyResult: Surveys, survey_settings:SurveySetting, survey_labels:SurveyLabels, }>) {
            state.mySurveyResult = action.payload.mySurveyResult;
            state.survey_settings = action.payload.survey_settings;
            state.survey_labels = action.payload.survey_labels;
        },
        FetchMySurveyResultDetail(state, action: PayloadAction<{ id: number }>) { },
        updateMySurveyResultDetail(state, action: PayloadAction<{ detail: MySurveyResult, survey_labels:SurveyLabels, survey_settings:SurveySetting, }>) {
            state.mySurveyResultDetail = action.payload.detail.survery;
            state.mySurveyResultScore = action.payload.detail.total_score.reduce((ack, s)=>(Number(s.score) == 1 ? (ack +1) : ack),0);
            state.mySurveyTotalScore = action.payload.detail.total_points;
            state.survey_settings = action.payload.survey_settings;
            state.survey_labels = action.payload.survey_labels;
        },
        checkVotingPermission(state, action: PayloadAction<{ data:any }>) { },


    },
})

// Actions
export const SurveyActions = {
    FetchSurveys:SurveySlice.actions.FetchSurveys,
    update:SurveySlice.actions.update,
    FetchSurveyDetail:SurveySlice.actions.FetchSurveyDetail,
    updateDetail:SurveySlice.actions.updateDetail,
    SubmitSurvey:SurveySlice.actions.SubmitSurvey,
    SurveySubmitSuccess:SurveySlice.actions.SurveySubmitSuccess,
    FetchMySurveyResults:SurveySlice.actions.FetchMySurveyResults,
    updateMySurveyResults:SurveySlice.actions.updateMySurveyResults,
    FetchMySurveyResultDetail:SurveySlice.actions.FetchMySurveyResultDetail,
    updateMySurveyResultDetail:SurveySlice.actions.updateMySurveyResultDetail,
    checkVotingPermission:SurveySlice.actions.checkVotingPermission,
}

export const SelectSurveys = (state: RootState) => state.surveys.surveys

export const SelectCompletedSurveys = (state: RootState) => state.surveys.completed_surveys

export const SelectSurveyDetail = (state: RootState) => state.surveys.detail

export const SelectSurveyLabelDetail = (state: RootState) => state.surveys.survey_labels

export const SelectSurveySubmitSuccess = (state: RootState) => state.surveys.submitSuccess

export const SelectMySurveyResult = (state: RootState) => state.surveys.mySurveyResult

export const SelectMySurveyResultDetail = (state: RootState) => state.surveys.mySurveyResultDetail

export const SelectMySurveyResultScore = (state: RootState) => state.surveys.mySurveyResultScore

export const SelectMySurveyTotalScore = (state: RootState) => state.surveys.mySurveyTotalScore

export const SelectSurveySettings = (state: RootState) => state.surveys.survey_settings


// Reducer
export default SurveySlice.reducer