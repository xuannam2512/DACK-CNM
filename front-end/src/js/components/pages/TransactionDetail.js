import React, { Component } from 'react'
import { connect } from "react-redux"
import NumberFormat from 'react-number-format'
import Pagination from "react-js-pagination"
import { Link } from "react-router-dom"
import axios from 'axios'

//font awesome
import '../../../../node_modules/font-awesome/css/font-awesome.min.css'

//import css
import '../../../css/transactiondetail.css'
import '../../../css/Home.css'

//import image
import bankLogo from '../../../image/logo2.png'

//import action
import { loadTransactionById } from '../../actions/index'

//map state to props
const mapStateToProps = state => {
    return { transaction: state.transaction };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTransactionById: transaction => {
            return dispatch(loadTransactionById(transaction));
        }
    };
};

class Receiver extends Component 
{
    constructor(props) {        
        super(props);

        this.state = {
            transaction: props.transaction
        }
    }

    componentDidMount() {
        var pathname = this.props.location.pathname;

        var res = pathname.split("/");
        var transaction_id = res[3];

        axios({
            method:'get',
            url: `http://localhost:3000/api/transactions/${transaction_id}`,
            headers: {
                'x-access-token': localStorage.getItem('access_token')
            }
        })
        .then(res => {
            this.props.loadTransactionById(res.data);
            this.setState({
                transaction: this.props.transaction
            });
        })
        .catch(err => {
            console.log(err);
        });

        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            transaction: nextProps.transaction
        })
    }

    render() {

        var transaction = this.state.transaction;
        var type;

        if (transaction.type == 1) {
            type = <span className="transaction-detail-value">Transfer</span>
        } else {
            type = <span className="transaction-detail-value">Recharge</span>;
        }



        return (
            <div className="container-fluid pl-0 pr-0 home-box">
                <div className="row mr-0 ml-0">
                    <div className="col-md-4 title-home">
                        <h2>Transaction Detail</h2>
                    </div>
                </div>

                <div className="row mr-0 ml-0">
                    <div className="col-md-1 bank-logo-box detail-logo">
                        <img src={bankLogo} className="img-rounded bank-logo" alt=""></img>
                    </div>
                    <div className="col-md-10">
                        <div className="row mr-0 ml-0">
                            <span className="transaction-detail-id">{transaction.transaction_id}</span>
                        </div>
                        <div className="row mr-0 ml-0">
                            <div className="col-md-6">
                                <span className="transaction-detail-title">From: </span>
                                <span>
                                    <NumberFormat 
                                        value={transaction.sender_account_number}
                                        format="#### - #### - ####"
                                        className="format-transaction-detail"
                                    />
                                </span>
                            </div>
                            <div className="col-md-6">
                                <span className="transaction-detail-title">To: </span>
                                <span>
                                    <NumberFormat 
                                        value={transaction.reciver_account_number}
                                        format="#### - #### - ####"
                                        className="format-transaction-detail"
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="row mr-0 ml-0">
                            <div className="col-md-6">
                                <span className="transaction-detail-title">Amount:</span>
                                <span className="transaction-detail-value">
                                    <NumberFormat 
                                        value={transaction.amount}
                                        displayType={'text'}
                                        thousandSeparator={ true }
                                    />
                                    <u className="ml-1">đ</u> 
                                </span>
                            </div>
                            <div className="col-md-6">
                                <span className="transaction-detail-title">Type of transaction:</span>
                                {type}
                            </div>
                        </div>
                        <div className="row mr-0 ml-0">
                            <div className="col-md-6">
                                <span className="transaction-detail-title">Time:</span>
                                <span className="transaction-detail-value">{transaction.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receiver);