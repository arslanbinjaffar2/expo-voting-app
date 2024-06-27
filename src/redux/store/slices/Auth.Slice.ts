import { RootState } from '../Index'
import { GeneralResponse } from '../../../utils/GeneralResponse';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAction } from '@reduxjs/toolkit';
import AsyncStorageClass from '../../../utils/AsyncStorageClass';
import { Platform } from 'react-native';
export interface LoginPayload {
    email: string;
    password: string;
}

export interface PasswordResetPayload {
    email: string;
}

export interface LoadProviderPayload {
    id: number;
    screen: string;
}

export interface ChooseProviderPayload {
    id: number;
    provider: string;
    screen: string;
}

export interface ResetPayload {
    password: string;
    password_confirmation: string;
    token: string;
}

export interface VerificationPayload {
    id: number;
    authentication_id: number;
    code?: string;
    screen?: string;
    provider?: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    processing?: boolean;
    response: GeneralResponse;
    error: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    processing: false,
    response: {},
    error: '',
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.processing = true;
        },
        logout(state) {
            state.processing = true;
        },
        passwordReset(state, action: PayloadAction<PasswordResetPayload>) {
            state.processing = true;
        },
        chooseProvider(state, action: PayloadAction<ChooseProviderPayload>) {
            state.processing = true;
        },
        reset(state, action: PayloadAction<ResetPayload>) {
            state.processing = true;
        },
        verification(state, action: PayloadAction<VerificationPayload>) {
            state.processing = true;
        },
        loadProvider(state, action: PayloadAction<LoadProviderPayload>) {
            state.processing = true;
        },
        getUser(state) {
            state.processing = true;
        },
        success(state, action: PayloadAction<GeneralResponse>) {
            state.processing = false;
            state.response = action.payload;
            state.error = '';
            if (action?.payload?.data?.access_token !== undefined) {
                if (Platform.OS === 'web') {
                    localStorage.setItem('access_token', action.payload.data.access_token);
                } else {
                    AsyncStorageClass.setItem('access_token', action.payload.data.access_token);
                }
                state.isLoggedIn = true;
            }
            else if(action?.payload?.data?.user !== undefined){
                state.isLoggedIn = true;
            }
        },
        failed(state, action: PayloadAction<string>) {
            state.processing = false;
            state.error = action.payload;
        },
        clearToken(state) {
            state.isLoggedIn = false;
            state.processing = false;
            state.response = { redirect: 'login' };
            if (Platform.OS === 'web') {
                localStorage.removeItem('access_token');
            } else {
                AsyncStorageClass.removeItem('access_token');
            }
        },
        loadToken(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        reloadPage(state) {
            // reload current page to refresh data
            if (Platform.OS === 'web') {
                window.location.reload();
            }
        },
    },
});

// Actions
export const AuthActions = {
    login: AuthSlice.actions.login,
    passwordReset: AuthSlice.actions.passwordReset,
    chooseProvider: AuthSlice.actions.chooseProvider,
    reset: AuthSlice.actions.reset,
    verification: AuthSlice.actions.verification,
    loadProvider: AuthSlice.actions.loadProvider,
    // getUser: AuthSlice.actions.getUser,
    success: AuthSlice.actions.success,
    failed: AuthSlice.actions.failed,
//     logout: AuthSlice.actions.logout,
//     loadToken: AuthSlice.actions.loadToken,
//     clearToken: AuthSlice.actions.clearToken,
//     reloadPage: AuthSlice.actions.reloadPage,
 }

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const isProcessing = (state: RootState) => state.auth.processing;

export const response = (state: RootState) => state.auth.response;

export const error = (state: RootState) => state.auth.error;

// Reducer
const authReducer = AuthSlice.reducer;

export default authReducer;