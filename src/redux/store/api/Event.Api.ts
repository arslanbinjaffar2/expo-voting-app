// import { Event } from 'application/models/Event';

import makeApi from "../../../utils/ConfigureAxios";

import { HttpResponse } from "../../../utils/GeneralResponse";

const EventBaseUrl = `/event`
const baseUrl = `/event`

export const getEventApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${payload}`);
}

// export const getEventByCodeApi = (payload: any, state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${payload}/get-event-by-code`);
// }

// export const getModulesApi = (state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${state?.event?.event.url}/event/app-modules`);
// }

// export const getSettingModulesApi = (state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${state?.event?.event.url}/event/app-settings-modules`);
// }
// export const fetchEventApi = (payload: any, state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/fetch-events/listing`, payload);
// }
// export const getHomeEventDetailApi = (payload: any, state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/fetch-events/detail/${payload.id}`, payload);
// }