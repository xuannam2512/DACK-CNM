import { LOGIN } from '../constants/action_type'

export const login = loginEntity => (
    {
        type: LOGIN,
        payload: loginEntity
    }
)