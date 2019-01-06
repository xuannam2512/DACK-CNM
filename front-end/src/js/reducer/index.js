const initState = {
    isLogined: false,
    userId: '',
    refreshToken: '',
    accessToken: '',
    permission: 1,
    receivers:[
        {
            accountNumber: '123456789123',
            remiderName: 'Test 1'
        },
        {
            accountNumber: '123456789123',
            remiderName: 'Test 2'
        },
        {
            accountNumber: '123456789123',
            remiderName: 'Test 3'
        },
        {
            accountNumber: '123456789123',
            remiderName: 'Test 4'
        },
        {
            accountNumber: '123456789123',
            remiderName: 'Test 5'
        },
        {
            accountNumber: '123456789123',
            remiderName: 'Test 6'
        },
        {
            accountNumber: '123456789123',
            remiderName: 'Test 7'
        },
        {
            accountNumber: '123456789123',
            remiderName: 'Test 8'
        }
    ],
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
    transactions: [
        {
            transaction_id: '123456781234',
            sender_account_number: '775692189123',
            reciver_account_number: '775692189456',
            amount: 1000000,
            type: 1,
            date: "2019-01-04 22:44:50"
        },
        {
            transaction_id: '123456782345',
            sender_account_number: '775692189789',
            reciver_account_number: '775692189456',
            amount: 1000000,
            type: 1,
            date: "2019-01-04 23:08:16"
        },
        {
            transaction_id: '123456783456',
            sender_account_number: '775692189456',
            reciver_account_number: '775692189456',
            amount: 1000000,
            type: 0,
            date: "2019-01-05 00:17:36"
        }
    ]
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN': 
        {
            console.log(action);
            return { 
                ...state, 
                isLogined: true, 
                userId: action.payload.user.user_id,
                refreshToken: action.payload.accessToken,
                accessToken: action.payload.refreshToken
            }            
        }
        default:
            return state;
    }
}

export default rootReducer;