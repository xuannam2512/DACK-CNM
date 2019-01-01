import React, { Component } from 'react'
import { connect } from "react-redux";

//import css
import '../../../css/account.css'

//import Components
import Login from './Login'
//import Register from './Register'



//map state to props
const mapStateToProps = state => {
    return { isLogin: state.isLogin };
};

class Account extends Component {

    constructor() {
        super();
    }

    render() {      
        console.log(this.props.isLogin)  
        return (
            <div className="container-fluid pl-0 pr-0">
                <div className="account-box">
                    {
                        !this.props.isLogin
                            ? <div className="row mb-5">
                                <div className="col-md-4"></div>
                                <div className="col-md-4 mt-5 login-background pl-4 pr-4">
                                    <Login />
                                </div>
                                <div className="col-md-4"></div>
                            </div>
                            : <div>
                                Home page
                            </div>
                    }
                </div>                                                          
            </div>
        )
    }
}

export default connect(mapStateToProps)(Account);