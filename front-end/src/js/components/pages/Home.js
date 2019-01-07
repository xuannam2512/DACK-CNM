import React, { Component } from 'react'
import { connect } from "react-redux"
import NumberFormat from 'react-number-format'
import Pagination from "react-js-pagination"
import { Link } from "react-router-dom"
import axios from 'axios'

//font awesome
import '../../../../node_modules/font-awesome/css/font-awesome.min.css'

//import css
import '../../../css/Home.css'

//import image
import bankLogo from '../../../image/logo2.png'

//import action
import { loadAccounts, lockAccount } from '../../actions/index'


//map state to props
const mapStateToProps = state => {
    return { 
        accounts: state.accounts,
        userId: state.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAccounts: accounts => {
            return dispatch(loadAccounts(accounts));
        },
        lockAccount: account => {
            return dispatch(lockAccount(account));
        }
    };
};

//define
const NUMBER_OF_ITEM = 7;

class Home extends Component {
    constructor(props) {        
        super(props);

        this.state = {
            accounts: [],
            accountsDisplay: [],
            accountsFilter: [],
            searchString: '',
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: parseInt(props.accounts.length / NUMBER_OF_ITEM) + 1,
            pageRangeDisplayed:5,
        }

        this.transferMoney = this.transferMoney.bind(this);
        this.searchAccount = this.searchAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    transferMoney = () => {
        alert("Transfer money");
    }

    viewTransactionHistory = () => {
        alert("View transaction history");
    }

    searchAccount = () => {
        alert("Searching...");
    }

    deleteAccount = (account) => {
        if(parseInt(account.balance) > 0)
        {
            alert("Balance must equal 0 đ");
        } else {
            alert("Delete Account");
            axios({
                method: 'post',
                url: `http://localhost:3000/api/accounts/lock`,
                data: {
                    account_number: account.account_number
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('access_token')
                }
            })
                .then(res => {
                    account.status = 0;
                    console.log(account.status);
                    this.props.lockAccount(account);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        axios({
                            method: 'post',
                            url: `http://localhost:3000/api/authen/accesstoken`,
                            data: {
                                refesh_token: localStorage.getItem("refresh_token")
                            },
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(res => {
                                localStorage.setItem('access_token', res.data.access_token)
                                this.deleteAccount();
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
        }
        
    }

    onChangeSearch = (e) => {
        let accountList = [];

        this.setState({
            searchString: e.target.value
        });

        var searchString = e.target.value.trim().toLowerCase();
        if(searchString.length > 0) {
            accountList = this.state.accounts.filter(account => account.account_number.toLowerCase().match(searchString));            
            
            this.setState({
                accountsFilter: accountList,
                accountsDisplay: accountList.slice(0, NUMBER_OF_ITEM),
                totalItemsCount: parseInt(accountList.length / NUMBER_OF_ITEM) + 1
            })
        } else {
            accountList = this.state.accounts;

            this.setState({
                accountsFilter: accountList,
                accountsDisplay: accountList.slice(0, NUMBER_OF_ITEM),
                totalItemsCount: parseInt(accountList.length / NUMBER_OF_ITEM) + 1
            })
        }
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            activePage: pageNumber,
            accountsDisplay: this.state.accountsFilter.slice((pageNumber - 1) * NUMBER_OF_ITEM, pageNumber * NUMBER_OF_ITEM)
        });
    }  

    componentDidMount() {        
        //call api to load accounts
        axios({
            method:'get',
            url: `http://localhost:3000/api/accounts/users/${this.props.userId}`,
            headers: {
                'x-access-token': localStorage.getItem('access_token')
            }
        })
        .then(res => {
            
            this.props.loadAccounts(res.data.filter(account => account.status === 1));
            this.setState({
                accounts: this.props.accounts,
                accountsDisplay: this.props.accounts.slice(0, NUMBER_OF_ITEM),
                accountsFilter: this.props.accounts,
                activePage: 1,
                itemsCountPerPage: 1,
                totalItemsCount: parseInt(this.props.accounts.length / NUMBER_OF_ITEM) + 1,
                pageRangeDisplayed:5,   
            });
        })
        .catch(err => {
            if(err.response.status === 401)
            {
                axios({
                    method:'post',
                    url: `http://localhost:3000/api/authen/accesstoken`,
                    data: {
                        refesh_token: localStorage.getItem("refresh_token")
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    localStorage.setItem('access_token', res.data.access_token)
                    this.componentDidMount();
                })
                .catch(err => {
                    console.log(err);
                })
            }
        });

        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            accounts: nextProps.accounts.filter(account => account.status === 1),
            accountsDisplay: nextProps.accounts.filter(account => account.status === 1).slice(0, NUMBER_OF_ITEM),
            accountsFilter: nextProps.accounts,
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: parseInt(nextProps.accounts.length / NUMBER_OF_ITEM) + 1,
            pageRangeDisplayed:5,   
        })
    }

    render() {                         

        var accounts = this.state.accountsDisplay.map((account, i) => 
            <li className="cart-item" key = {i}>
                <div className="row ml-0 mr-0">
                    <div className="col-md-1 bank-logo-box">
                        <img src={bankLogo} className="img-rounded bank-logo" alt=""></img>
                    </div>
                    <div className="col-md-6">
                        <div className="row mr-0 ml-0 bank-account-number">                         
                            <NumberFormat 
                            value={account.account_number}
                            format="#### - #### - ####"
                            className="format-custom"                              
                            />                                                                                                                   
                        </div>  
                        <div className="row mr-0 ml-0 bank-account-balance">
                            <span className="balance-title">Balance:</span>
                            <span>
                                <NumberFormat value={account.balance}
                                            displayType={'text'}
                                            thousandSeparator={ true }
                                />
                                 <u className="ml-1">đ</u> 
                            </span>
                        </div>                                     
                    </div>
                    <div className="col-md-5 pr-4 bank-feature">
                        <Link to={`/transaction/history/${account.account_number}`} className="link-payment">
                            <span className="transaction-history"
                            onClick={() => this.viewTransactionHistory()}>
                                <i className="fa fa-history" aria-hidden="true"></i>
                            </span>
                        </Link>
                        <Link to={`/payment/${account.account_number}`} className="link-payment">
                            <span className="transfer"
                            onClick={() => this.transferMoney()}>
                                <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                            </span>
                        </Link>
                        
                        <span className="delete"
                        onClick={() => this.deleteAccount(account)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </span>                                    
                    </div>
                </div>                            
            </li>
        ) 

        return (
            <div className="container-fluid pl-0 pr-0 home-box">
                <div className="row mr-0 ml-0">
                    <div className="col-md-4 title-home">
                        <h2>Your Accounts</h2>
                    </div>
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4 search-account-box">
                        <div className="row search-input-box">
                            <div className="col-md-10">
                                <input type="text"                                 
                                className="search-input"
                                placeholder="Account number..."
                                onChange={this.onChangeSearch} />
                            </div>  
                            <div className="col-md-2">
                                <span onClick={() => this.searchAccount()}>
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </span>                                
                            </div>                                                      
                        </div>
                    </div>
                </div>
                <div className="row cart mr-0 ml-0">
                    <ul className="w-100 pl-0 mb-0">                                
                        {accounts}
                    </ul>                    
                </div>  
                <div className="row mt-3 pagination-box">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}  
                        itemClass="page-item"
                        linkClass="page-link"                      
                    />
                </div>              
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);