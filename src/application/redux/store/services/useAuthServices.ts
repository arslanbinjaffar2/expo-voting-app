import { useCallback } from 'react'

import { AuthActions, LoginPayload, PasswordResetPayload, ChooseProviderPayload, ResetPayload, VerificationPayload, LoadProviderPayload, selectIsLoggedIn, isProcessing, response, error } from '@redux/store/slices/Auth.Slice'



import {TestActions, SelectAlerts   } from '../slices/Test.Slice'
import { useAppDispatch, useAppSelector } from '../Hooks'
import { GeneralResponse } from '@application/components/utils/GeneralResponse'


export type EventServiceOperators = {
    isLoggedIn: boolean;
    processing?: boolean;
    response: GeneralResponse;
    error: string;
    login: (payload: LoginPayload) => void
    passwordReset: (payload: PasswordResetPayload) => void
    chooseProvider: (payload: ChooseProviderPayload) => void
    reset: (payload: ResetPayload) => void
    verification: (payload: VerificationPayload) => void
    loadProvider: (payload: LoadProviderPayload) => void
    // getUser: () => void
    logout: () => void
    clearToken:()=>void
    // loadToken: (logged: boolean) => void
}

/**
 * EventService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseAuthService = (): Readonly<EventServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        isLoggedIn: useAppSelector(selectIsLoggedIn),
        processing: useAppSelector(isProcessing),
        response: useAppSelector(response),
        error: useAppSelector(error),
        login: useCallback(
            (payload: LoginPayload) => {
                dispatch(AuthActions.login(payload))
            },
            [dispatch],
        ),
        passwordReset: useCallback(
            (payload: PasswordResetPayload) => {
                dispatch(AuthActions.passwordReset(payload))
            },
            [dispatch],
        ),
        chooseProvider: useCallback(
            (payload: ChooseProviderPayload) => {
                dispatch(AuthActions.chooseProvider(payload))
            },
            [dispatch],
        ),
        reset: useCallback(
            (payload: ResetPayload) => {
                dispatch(AuthActions.reset(payload))
            },
            [dispatch],
        ),
        verification: useCallback(
            (payload: VerificationPayload) => {
                dispatch(AuthActions.verification(payload))
            },
            [dispatch],
        ),
        loadProvider: useCallback(
            (payload: LoadProviderPayload) => {
                dispatch(AuthActions.loadProvider(payload))
            },
            [dispatch],
        ),
        // getUser: useCallback(
        //     () => {
        //         dispatch(AuthActions.getUser())
        //     },
        //     [dispatch],
        // ),
        logout: useCallback(
            () => {
                dispatch(
                    AuthActions.logout(),
                )
            },
            [dispatch],
        ),
        // loadToken: useCallback(
        //     (logged: boolean) => {
        //         dispatch(
        //             AuthActions.loadToken(logged),
        //         )
        //     },
        //     [dispatch],
        // ),
        clearToken: useCallback(
            () => {
                dispatch(
                    AuthActions.clearToken(),
                )
            },
            [dispatch],
        ),
        
    }
}

export default UseAuthService