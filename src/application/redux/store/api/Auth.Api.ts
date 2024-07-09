import { HttpResponse, makeApi } from '../../../components/utils';
import { LoginPayload} from '../slices/Auth.Slice';



const EventBaseUrl = `/event`

export const getLoginApi = (payload: LoginPayload, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${EventBaseUrl}/${state?.event?.event.url}/auth/login`, payload);
}

// export const getUserApi = (state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${state?.event?.event.url}/attendee/profile`);
// }

// export const getPasswordResetApi = (payload: PasswordResetPayload, state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).post(`${EventBaseUrl}/${state?.event?.event.url}/auth/password/email`, payload);
// }

// export const getChooseProviderApi = (payload: ChooseProviderPayload, state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).post(`${EventBaseUrl}/${state?.event?.event.url}/auth/verification/${payload.id}`, payload);
// }

// export const getResetApi = (payload: ResetPayload, state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).post(`${EventBaseUrl}/${state?.event?.event.url}/auth/password/reset/${payload.token}`, payload);
// }

// export const getVerificationApi = (payload: VerificationPayload, state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).post(`${EventBaseUrl}/${state?.event?.event.url}/auth/verification/${payload.id}`, payload);
// }

// export const getLoadProviderApi = (payload: LoadProviderPayload, state: any): Promise<HttpResponse> => {
//     return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${state?.event?.event.url}/auth/verification/${payload.id}?screen=${payload.screen}`);
// }