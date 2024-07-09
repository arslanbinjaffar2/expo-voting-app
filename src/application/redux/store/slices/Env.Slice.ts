import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../Index'


export interface EnvState {
    enviroment: string,
    api_base_url: string,
    eventcenter_base_url: string,
    msw_enabled: string,
    api_gateway_url: string,
    app_server_enviornment: string,
    socket_connection_server: string,
    app_api_url: string,
    app_registration_url: string,
}

const initialState: EnvState = {
    enviroment: '',
    api_base_url: '',
    eventcenter_base_url: '',
    msw_enabled: '',
    api_gateway_url: '',
    app_server_enviornment:'',
    socket_connection_server:'',
    app_api_url:'',
    app_registration_url:'',
}

// Slice
export const EnvSlice = createSlice({
    name: 'env',
    initialState,
    reducers: {
        update(state, action: PayloadAction<EnvState>) {
            state.enviroment = action.payload.enviroment
            state.api_base_url = action.payload.api_base_url
            state.eventcenter_base_url = action.payload.eventcenter_base_url
            state.msw_enabled = action.payload.msw_enabled
            state.api_gateway_url = action.payload.api_gateway_url
            state.app_server_enviornment = action.payload.app_server_enviornment
            state.socket_connection_server = action.payload.socket_connection_server
            state.app_api_url = action.payload.app_api_url
            state.app_registration_url = action.payload.app_registration_url
        },
    },
})

// Actions
export const EnvActions = {
    update: EnvSlice.actions.update,
}

// Selectors
export const Env = (state: RootState) => state.env

// Reducer
export default EnvSlice.reducer