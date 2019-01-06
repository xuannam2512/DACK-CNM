const initState = {
    isLogined: false,
    userId: '',
    permission: 1,
    receivers:[],
    accounts: []
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
        case 'LOGOUT': 
        {            
            return { 
                ...state, 
                isLogined: false
            }            
        }
        case 'LOCK_ACCOUNT': 
        {            
            console.log(action.payload);
            return { 
                ...state, 
                accounts: state.accounts.map(d=>{
                    if(d.account_number === action.payload.account_number) {
                        return action.payload
                    }else {
                        return {...d}
                    }
                })
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
        case 'LOAD_RECEIVERS':
        {
            console.log(action.payload);
            return {
                ...state,
                receivers: action.payload
            }
        }
        case 'ADD_RECEIVERS':
        {
            console.log(action.payload);
            return {
                ...state,
                receivers: state.receivers.push(action.payload)
            }
        }
        default:
            return state;
    }
}

export default rootReducer;