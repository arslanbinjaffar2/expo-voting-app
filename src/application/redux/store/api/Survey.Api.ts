import { HttpResponse, makeApi } from "../../../components/utils";


const baseUrl = `/event`

export const getSurveyApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/survey/listing`);
}

export const getSurveyDetailApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/survey/detail/${payload.id}`, { ...payload });
}

export const submitSurveyApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_gateway_url}`).post(`/v2/save-surveys`, { ...payload });
}

export const getMySurveyResultApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.eventcenter_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/settings/my-survey-results`);
}

export const getMySurveyResultDetailApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.eventcenter_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/settings/my-survey-result-detail/${payload.id}`, {...payload});
}
export const getCheckVotingPermissionApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.eventcenter_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/survey/voting-permission`, {...payload});
}