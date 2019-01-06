import { LOGIN } from '../constants/action_type'
import { LOAD_ACCOUNTS } from '../constants/action_type'

export const login = loginEntity => (
    {
        type: LOGIN,
        payload: loginEntity
    }
)

export const loadAccounts = (accounts) => (
    {
        type: LOAD_ACCOUNTS,
        payload: accounts
    }
)
    