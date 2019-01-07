import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import axios from 'axios'

//components
import Account from "./Account/Account"
import Page from './pages/Page'
import PageStaff from './Staff/PageStaff'

import { login } from '../actions/index'

const mapStateToProps = state => {
    return { 
        isLogined: state.isLogined,
        permission: state.permission
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: loginEntity => {
            return dispatch(login(loginEntity));
        } 
    };
};

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // isLogined: props.isLogined,
            // permission: props.permission
            isLogined: true,
            permission: 0
        }
    }

    checkLogin() {        
        if(localStorage.getItem('refresh_token'))
        {
            return true;
        } else {
            return false;
        }        
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            isLogined: nextProps.isLogined
        });
    }

    componentDidMount() {
        if(localStorage.getItem("refresh_token")){
            this.setState({
                isLogined: true
            })
            let token = localStorage.getItem("refresh_token");
            axios({
                method:'get',
                url: `http://localhost:3000/api/users/token/${token}`,
            })
            .then(res => {
                if(res.status === 200)
                {
                    let data = {
                        user: res.data
                    }
                   
                    this.props.login(data);
                }
            })
            .catch(err => {
                console.log(err);
            })            
        }
    }

    render() {
        return (    
            <Router>
            {
                !this.props.isLogined
                ?
                <Switch>                    
                    <Route path="/login" component={Account}/>
                    <Redirect to="/login"/>
                </Switch>                
                :
                <div>
                {
                    this.props.permission === 1
                    ?
                    <div>
                        {
                            window.location.href.trim().includes('/login')
                                ?
                                <div>
                                    <Redirect to="/" />
                                    <Route path="/" component={Page} />
                                </div>
                                :
                                <Route path="/" component={Page} />
                        }
                    </div>
                    :
                    <div>
                        {
                            window.location.href.trim().includes('/login')
                                ?
                                <div>
                                    <Redirect to="/" />
                                    <Route path="/" component={PageStaff} />
                                </div>
                                :
                                <Route path="/" component={PageStaff} />
                        }
                    </div> 
                }                    
                </div>                                              
            }                              
            </Router>                    
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);