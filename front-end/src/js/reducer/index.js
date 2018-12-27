const initState = {
    isLogin: false
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN': 
        {
            return { ...state, isLogin: true}            
        }
        default:
            return state;
    }
}

export default rootReducer;