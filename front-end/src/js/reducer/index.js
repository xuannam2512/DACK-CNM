const initState = {
    isLogined: false,
    userId: '',
    permission: 1,
    receivers:[],
    accounts: [],
    transactions: [],
    transaction: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN': 
        {            
            return { 
                ...state, 
                isLogined: true, 
                userId: action.payload.user.user_id,
                permission: action.payload.user.permission
            }            
        }
        case 'LOAD_ACCOUNTS':
        {
            console.log(action.payload);
            return {
                ...state,
                accounts: action.payload
            }
        }
        case 'LOAD_TRANSACTIONS':
        {
            console.log(action.payload);
            return {
                ...state,
                transactions: action.payload
            }
        }
        case 'LOAD_TRANSACTION_BY_ID':
        {
            console.log(action.payload);
            return {
                ...state,
                transaction: action.payload
            }
        }
        default:
            return state;
    }
}

export default rootReducer;