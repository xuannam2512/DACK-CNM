const initState = {
    isLogined: false,
    userId: '',
    refreshToken: '',
    accessToken: '',
    accounts: [
        {
            accountNumber: '795866789123',
            balance: 10000000
        },
        {
            accountNumber: '123456789123',
            balance: 12000000
        },
        {
            accountNumber: '123456789124',
            balance: 14000000
        },
        {
            accountNumber: '123456789123',
            balance: 13000000
        },
        {
            accountNumber: '123456789123',
            balance: 16000000
        },
        {
            accountNumber: '775692189123',
            balance: 18000000
        },
        {
            accountNumber: '775692189123',
            balance: 18000000
        },
        {
            accountNumber: '775692189123',
            balance: 18000000
        },
        {
            accountNumber: '775692189123',
            balance: 18000000
        },
        {
            accountNumber: '775692189123',
            balance: 18000000
        }
    ],
    xuser: 'hai',
    xfullname: 'dinhvantuanhai',
    xphone: '0981823112',
    xmail: 'toihocly@gmail.com',
    xpassword: 'aloha'
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN': 
        {
<<<<<<< HEAD
            return { ...state, isLogin: true }            
=======
            console.log(action);
            return { 
                ...state, 
                isLogined: true, 
                userId: action.payload.user.user_id,
                refreshToken: action.payload.accessToken,
                accessToken: action.payload.refreshToken
            }            
>>>>>>> f62c17fd3fd3e129905fe1bc6e5614440f8c7e26
        }
        default:
            return state;
    }
}

export default rootReducer;