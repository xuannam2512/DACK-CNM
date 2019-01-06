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
import { loadAccounts } from '../../actions/index'


//map state to props
const mapStateToProps = state => {
    return { 
        accounts: state.accounts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAccounts: accounts => {
            return dispatch(loadAccounts(accounts));
        } 
    };
};

//define
const NUMBER_OF_ITEM = 3;

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

    deleteAccount = () => {
        alert("Delete Account");
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
            url: `http://localhost:3000/api/accounts`,
            headers: {
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InRlc3QyIiwiZnVsbG5hbWUiOiJMw6ogWHXDom4gTmFtIiwicGhvbmUiOiIwMTIzNDU2Nzg5IiwiZW1haWwiOiJ4dWFubmFtMjUxMkBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIiwicGVybWlzc2lvbiI6MH1dLCJpYXQiOjE1NDY3ODMyNzMsImV4cCI6MTU0Njc4Njg3M30.8hRBMEwod0WzwExeSxm0YXjmVNdCZY8pH62xezz_NEo'
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
            console.log(err);
        });

        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            accounts: nextProps.accounts
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
                        <Link to="/transaction/history" className="link-payment">
                            <span className="transaction-history"
                            onClick={() => this.viewTransactionHistory()}>
                                <i className="fa fa-history" aria-hidden="true"></i>
                            </span>
                        </Link>
                        <Link to="/payment" className="link-payment">
                            <span className="transfer"
                            onClick={() => this.transferMoney()}>
                                <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                            </span>
                        </Link>
                        
                        <span className="delete"
                        onClick={() => this.deleteAccount()}>
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