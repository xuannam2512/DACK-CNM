import React, { Component } from 'react'
import { connect } from "react-redux"
import NumberFormat from 'react-number-format'
import Pagination from "react-js-pagination"
import { Link } from "react-router-dom"

//font awesome
import '../../../../node_modules/font-awesome/css/font-awesome.min.css'

//import css
import '../../../css/Home.css'

//import image
import bankLogo from '../../../image/logo2.png'


//map state to props
const mapStateToProps = state => {
    return { transactions: state.transactions };
};

//define
const NUMBER_OF_ITEM = 3;

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
            transactionList = this.state.transactions.filter(transaction => transaction.transaction_id.match(searchString));            
            
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
        this.setState({
            transactionsDisplay: this.state.transactions.slice(0, NUMBER_OF_ITEM),
            transactionsFilter: this.state.transactions
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
                            <NumberFormat 
                                value={transaction.transaction_id}
                                format="#### - #### - ####"
                                className="format-custom"
                            />
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
                        <Link to="/transaction/detail" className="link-payment">
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

export default connect(mapStateToProps)(Receiver);