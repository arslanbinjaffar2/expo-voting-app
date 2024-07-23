import { useCallback } from 'react'

import { EnvActions, Env, EnvState } from '@redux/store/slices/Env.Slice'
import { useAppDispatch, useAppSelector } from '@redux/store/Hooks'


export type EnvServiceOperators = {
    _env: EnvState
    updateEnv: (env: EnvState) => void
}

/**
 * EnvService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseEnvService = (): Readonly<EnvServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        _env: useAppSelector(Env),
        updateEnv: useCallback(
            (env: EnvState) => {
                dispatch(
                    EnvActions.update({
                        ...env
                    }),
                )
            },
            [dispatch],
        ),
    }
}

export default UseEnvService