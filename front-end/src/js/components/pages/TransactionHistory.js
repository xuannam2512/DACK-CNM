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
import { loadTransactions } from '../../actions/index'

//map state to props
const mapStateToProps = state => {
    console.log(state);
    return {
        transactions: state.transactions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTransactions: transactions => {
            return dispatch(loadTransactions(transactions));
        }
    };
};

//define
const NUMBER_OF_ITEM = 7;

class Receiver extends Component 
{
    constructor(props) {        
        super(props);

        this.state = {
            transactions: props.transactions,
            transactionsDisplay: [],
            transactionsFilter: [],
            searchString: '',
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: parseInt(props.transactions.length / NUMBER_OF_ITEM) + 1,
            pageRangeDisplayed: 5
        }

        this.searchAccount = this.searchAccount.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    searchAccount = () => {
        alert("Searching...");
    }

    deleteAccount = () => {
        alert("Delete Account");
    }

    onChangeSearch = (e) => {
        let transactionList = [];

        this.setState({
            searchString: e.target.value
        });

        var searchString = e.target.value.trim().toLowerCase();
        if(searchString.length > 0) {
            let transactionId = parseInt(searchString);
            transactionList = this.props.transactions.filter(transaction => transaction.transaction_id === transactionId);            
            
            this.setState({
                transactionsFilter: transactionList,
                transactionsDisplay: transactionList.slice(0, NUMBER_OF_ITEM),
                totalItemsCount: parseInt(transactionList.length / NUMBER_OF_ITEM) + 1
            })
        } else {
            transactionList = this.state.transactions;

            this.setState({
                transactionsFilter: transactionList,
                transactionsDisplay: transactionList.slice(0, NUMBER_OF_ITEM),
                totalItemsCount: parseInt(transactionList.length / NUMBER_OF_ITEM) + 1
            })
        }
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            activePage: pageNumber,
            transactionsDisplay: this.state.transactionsFilter.slice((pageNumber - 1) * NUMBER_OF_ITEM, pageNumber * NUMBER_OF_ITEM)
        });
    }  

    componentDidMount() {
        var pathname = this.props.location.pathname;

        var res = pathname.split("/");
        var account_number = res[3];

        axios({
            method:'get',
            url: `http://localhost:3000/api/transactions/user/${account_number}`,
            headers: {
                'x-access-token': localStorage.getItem('access_token')
            }
        })
        .then(res => {
            
            this.props.loadTransactions(res.data.filter(transaction => transaction.success === 1));
            this.setState({
                transactions: this.props.transactions,
                transactionsDisplay: this.props.transactions.slice(0, NUMBER_OF_ITEM),
                transactionsFilter: this.props.transactions,
                activePage: 1,
                itemsCountPerPage: 1,
                totalItemsCount: parseInt(this.props.transactions.length / NUMBER_OF_ITEM) + 1,
                pageRangeDisplayed:5,   
            });
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
        });

        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            transactions: nextProps.transactions
        })
    }

    render() {                    

        var transactions = this.state.transactionsDisplay.map((transaction, i) => 
            <li className="cart-item" key = {i}>
                <div className="row ml-0 mr-0">
                    <div className="col-md-1 bank-logo-box">
                        <img src={bankLogo} className="img-rounded bank-logo" alt=""></img>
                    </div>
                    <div className="col-md-6">
                        <div className="row mr-0 ml-0 bank-account-number">                         
                            <span className="balance-title">{transaction.transaction_id}</span>
                        </div>
                        <div className="row mr-0 ml-0 bank-account-balance">
                            <span className="balance-title">Amount:</span>
                            <span>
                                <NumberFormat value={transaction.amount}
                                            displayType={'text'}
                                            thousandSeparator={ true }
                                />
                                 <u className="ml-1">đ</u> 
                            </span>
                        </div>
                    </div>
                    <div className="col-md-5 pr-4 bank-feature">
                        <Link to={`/transaction/detail/${transaction.transaction_id}`} className="link-payment">
                            <span className="transaction-detail">
                                <i className="fa fa-edit" aria-hidden="true"></i>
                            </span>
                        </Link>
                    </div>
                </div>
            </li>
        ) 

        return (
                <div className="container-fluid pl-0 pr-0 home-box">
                    <div className="row mr-0 ml-0">
                        <div className="col-md-4 title-home">
                            <h2>Your Transaction History</h2>
                        </div>
                        <div className="col-md-3 search-account-box">

                        </div>
                        <div className="col-md-4 search-account-box">
                            <div className="row search-input-box">
                                <div className="col-md-10">
                                    <input type="text"
                                        className="search-input"
                                        placeholder="Transaction ID..."
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
                            {transactions}
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

export default connect(mapStateToProps, mapDispatchToProps)(Receiver);