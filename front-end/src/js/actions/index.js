
import { LOAD_ACCOUNTS, LOCK_ACCOUNT, LOGOUT, LOGIN, LOAD_RECEIVERS, ADD_RECEIVERS } from '../constants/action_type'

export const login = loginEntity => (
    {
        type: LOGIN,
        payload: loginEntity
    }
)

export const logout = () => (
    {
        type: LOGOUT
    }
)

export const loadAccounts = (accounts) => (
    {
        type: LOAD_ACCOUNTS,
        payload: accounts
    }
)

export const lockAccount = (account) => (
    {
        type: LOCK_ACCOUNT,
        payload: account
    }
)

export const loadReceivers = (receivers) => (
    {
        type: LOAD_RECEIVERS,
        payload: receivers
    }
)

export const addReceiver = (receiver) => (
    {
        type: ADD_RECEIVERS,
        payload: receiver
    }
)
    