import { LOGIN } from '../constants/action_type'
import { LOAD_ACCOUNTS } from '../constants/action_type'
import { LOAD_TRANSACTIONS } from '../constants/action_type'
import { LOAD_TRANSACTION_BY_ID } from '../constants/action_type'

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

export const loadTransactions = (transactions) => (
    {
        type: LOAD_TRANSACTIONS,
        payload: transactions
    }
)

export const loadTransactionById = (transaction) => (
    {
        type: LOAD_TRANSACTION_BY_ID,
        payload: transaction
    }
)