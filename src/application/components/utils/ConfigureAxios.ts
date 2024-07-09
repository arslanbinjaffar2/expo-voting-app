import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import AsyncStorageClass from './AsyncStorageClass';
import { Platform } from 'react-native';
// manual added
export default function makeApi(baseURL: string, multiPartFormData = false) {

    const api = axios.create({
        baseURL,
    })

    api.defaults.headers.post['Content-Type'] = multiPartFormData ? "multipart/form-data" : "application/json";

    api.defaults.headers.put['Content-Type'] = "application/json";

    api.defaults.headers.delete['Content-Type'] = "application/json";

    api.interceptors.request.use(
        async (config: any) => {
            if (Platform.OS === 'web' && localStorage.getItem('access_token')) {
                config.headers = { ...config.headers, Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            } else if (Platform.OS === "android" || Platform.OS === "ios") {
                const token = await AsyncStorageClass.getItem('access_token');
                if (token) {
                    config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    )

    api.interceptors.response.use((response) => response, (error) => {
        if (error.response.status === 401) {
            return {
                status: error.response.status,
                data: {
                    data: []
                }
            }
        } else if (error.response.status === 422) {
            return error.response;
        }
    });

    api.interceptors.response.use(
        (response) => {
            const responseData = response as AxiosResponse<any, any>;
            return responseData;
        }
    )
    return api
}