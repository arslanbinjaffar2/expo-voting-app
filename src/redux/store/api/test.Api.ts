import makeApi from "../../../utils/ConfigureAxios";

import { HttpResponse } from "../../../utils/GeneralResponse";

const baseUrl = `/event`

export const getAlertApi = (payload: any, state: any): Promise<HttpResponse> => {
    // return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/alerts`);
    return makeApi('https://dummyjson.com/products').post('/add',payload)
}

// export const getAlertDetailsApi = (payload: any, state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/alerts/detail/${payload.alertId}`);
// }

// export const markAlertAsRead = (payload: any, state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/alerts/mark/read/${payload.alertId}`);
// }

// export const markAlertRead = (payload: any, state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/alerts/markAlertRead`, payload);
// }
