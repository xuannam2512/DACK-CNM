import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import axios from 'axios'

//import css
import '../../../css/navigationbar.css'

//import image
import logo from '../../../image/logo2.png'

import { logout } from '../../actions/index'

const mapStateToProps = state => {
    return { 
        userId: state.userId
    };
};


const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            return dispatch(logout());
        } 
    };
};

class NavigationBar extends Component
{
    constructor() {
        super();

        this.state = {

        }
    }

    handleLogOut =  () => {
        axios({
            method:'post',
            url: `http://localhost:3000/api/users/logout`,
            data: {
                userId: this.props.userId
            },
            headers: {
                'x-access-token': localStorage.getItem('access_token')
            }
        })
        .then(res => {
            console.log(res);
            localStorage.clear();
            this.props.logout();
            this.props.history.push('/');
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
                        this.handleLogOut();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }

    render() {
        return (
                <div className="container-fluid pl-0 pr-0">
                    <div className="row">
                        <div className="col-md-4 nav-right-box pl-0 pr-0">
                            <img src={logo} alt=""></img>
                        </div>                     
                        <div className="col-md-8 pl-0 pr-0 nav-left-box">
                            <div className="row nav-title">
                                No Money No Bank                             
                            </div>
                            
                            <div className="row nav-menu">
                                <div className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/" className="item">HOME</Link>                                
                                </div>
                                <div className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/about" className="item">ABOUT</Link>                                
                                </div>
                                <div className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/account" className="item">ACCOUNT</Link>
                                </div>
                                <div className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/receiver" className="item">RECEIVER</Link>
                                </div>
                                <div className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/contact" className="item">CONTACT</Link>
                                </div>
                                <div className="col-2 pl-0 pr-0">
                                    <div className="btn-logout">
                                        <button className="btn btn-defaul btn-primary" onClick={() => {this.handleLogOut()}}>
                                            Logout
                                        </button>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>         
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavigationBar));