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

import { loadReceivers } from '../../actions/index'


//map state to props
const mapStateToProps = state => {
    return { 
        receivers: state.receivers,
        userId: state.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadReceivers: receivers => {
            return dispatch(loadReceivers(receivers));
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
            receivers: [],
            receiversDisplay: [],
            receiversFilter: [],
            searchString: '',
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: parseInt(props.receivers.length / NUMBER_OF_ITEM) + 1,
            pageRangeDisplayed:5
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
        let receiverList = [];

        this.setState({
            searchString: e.target.value
        });

        var searchString = e.target.value.trim().toLowerCase();
        if(searchString.length > 0) {
            receiverList = this.state.receivers.filter(receiver => receiver.remider_name.toLowerCase().match(searchString));            
            
            this.setState({
                receiversFilter: receiverList,
                receiversDisplay: receiverList.slice(0, NUMBER_OF_ITEM),
                totalItemsCount: parseInt(receiverList.length / NUMBER_OF_ITEM) + 1
            })
        } else {
            receiverList = this.state.receivers;

            this.setState({
                receiversFilter: receiverList,
                receiversDisplay: receiverList.slice(0, NUMBER_OF_ITEM),
                totalItemsCount: parseInt(receiverList.length / NUMBER_OF_ITEM) + 1
            })
        }
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            activePage: pageNumber,
            receiversDisplay: this.state.receiversFilter.slice((pageNumber - 1) * NUMBER_OF_ITEM, pageNumber * NUMBER_OF_ITEM)
        });
    }  

    handleAddReceiver = () => {
        alert("Add Receiver")
    }

    componentDidMount() {
        axios({
            method:'get',
            url: `http://localhost:3000/api/recievers/users/${this.props.userId}`,
            headers: {
                'x-access-token': localStorage.getItem('access_token')
            }
        })
        .then(res => {
            console.log(res);
            if(res.status === 200)
            {                
                this.props.loadReceivers(res.data);
                this.setState({
                    receivers: this.props.receivers,
                    receiversDisplay: this.props.receivers.slice(0, NUMBER_OF_ITEM),
                    receiversFilter: this.props.receivers,
                    activePage: 1,
                    itemsCountPerPage: 1,
                    totalItemsCount: parseInt(this.props.receivers.length / NUMBER_OF_ITEM) + 1,
                    pageRangeDisplayed:5    
                });
            }
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
                        this.componentDidMount();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            receivers: nextProps.receivers,
            receiversDisplay: nextProps.receivers.slice(0, NUMBER_OF_ITEM),
            receiversFilter: nextProps.receivers,
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: parseInt(nextProps.receivers.length / NUMBER_OF_ITEM) + 1,
            pageRangeDisplayed:5    
        });
    }

    render() {                    

        var accounts = this.state.receiversDisplay.map((receiver, i) => 
            <li className="cart-item" key = {i}>
                <div className="row ml-0 mr-0">
                    <div className="col-md-1 bank-logo-box">
                        <img src={bankLogo} className="img-rounded bank-logo" alt=""></img>
                    </div>
                    <div className="col-md-6">
                        <div className="row mr-0 ml-0 bank-account-number">                         
                            <NumberFormat 
                            value={receiver.reciver_account_number}
                            format="#### - #### - ####"
                            className="format-custom"                              
                            />                                                                                                                   
                        </div>  
                        <div className="row mr-0 ml-0 bank-account-balance">
                            <span className="balance-title">Remider Name:</span>
                            <span>
                                {receiver.remider_name}
                            </span>
                        </div>                                     
                    </div>
                    <div className="col-md-5 pr-4 bank-feature">                                                        
                        
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
                            <h2>Your Receiver Accounts</h2>
                        </div>
                        <div className="col-md-3 search-account-box">

                        </div>
                        <div className="col-md-4 search-account-box">
                            <div className="row search-input-box">
                                <div className="col-md-10">
                                    <input type="text"
                                        className="search-input"
                                        placeholder="Remider name..."
                                        onChange={this.onChangeSearch} />
                                </div>
                                <div className="col-md-2">
                                    <span onClick={() => this.searchAccount()}>
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 search-account-box">
                            <Link to="/receiver/add">
                                <span className="btn-add" onClick={() => { this.handleAddReceiver() }}>
                                    <i class="fa fa-plus-square" aria-hidden="true"></i>
                                </span>
                            </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Receiver);