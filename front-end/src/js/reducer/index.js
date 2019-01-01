const initState = {
    isLogin: false,
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
    ]
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