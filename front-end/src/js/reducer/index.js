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
        case 'LOAD_ACCOUNTS':
        {
            console.log(action.payload);
            return {
                ...state,
                accounts: action.payload
            }
        }
        default:
            return state;
    }
}

export default rootReducer;