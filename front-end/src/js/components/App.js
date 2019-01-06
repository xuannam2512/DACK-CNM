import React, { Component } from 'react'
<<<<<<< HEAD
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter   } from "react-router-dom"
//font awesome
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
//components
import Account from "./Account/Account"
import Page from './pages/Page';
import Sample from './Staff/sample';
import PageStaff from   './Staff/Page';
library.add(faEnvelope,faKey);
=======
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import { connect } from 'react-redux'

//components
import Account from "./Account/Account"
import Page from './pages/Page'

const mapStateToProps = state => {
    return { isLogined: state.isLogined };
};
>>>>>>> f62c17fd3fd3e129905fe1bc6e5614440f8c7e26

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
<<<<<<< HEAD
                <div>                    
                    <Route path="/login" component={Account}/>
                    <Route path="/sample" component={Sample}/>
                    <Route path="/staff" component={PageStaff}/>
                    <Route path="/user" component={Page}/>
                </div>
=======
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
>>>>>>> f62c17fd3fd3e129905fe1bc6e5614440f8c7e26
            }                              
            </Router>                    
        )
    }
}

export default connect(mapStateToProps)(App);