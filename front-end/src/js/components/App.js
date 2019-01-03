import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import { connect } from 'react-redux'

//components
import Account from "./Account/Account"
import Page from './pages/Page'

const mapStateToProps = state => {
    return { isLogined: state.isLogined };
};

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogined: props.isLogined
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
            });
        }
    }

    render() {
        return (    
            <Router>
            {
                !this.state.isLogined
                ?
                <Switch>                    
                    <Route path="/login" component={Account}/>
                    <Redirect to="/login"/>
                </Switch>                
                :
                <div>
                {
                    window.location.href.trim().includes('/login')
                    ?
                    <div>     
                        <Redirect to="/"/> 
                        <Route path="/" component={Page}/>                                                                                                               
                    </div>   
                    :
                    <Route path="/" component={Page}/> 
                }                    
                </div>                                                 
            }                              
            </Router>                    
        )
    }
}

export default connect(mapStateToProps)(App);