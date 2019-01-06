import React, { Component } from 'react'
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

class App extends Component {

    constructor() {
        super();

        this.state = {
            isLogined: true
        }
    }

    render() {
        return (    
            <Router>
            {
                !this.state.isLogined
                ?
                <div>
                    <Redirect to="/login"/>
                    <Route path="/login" component={Account}/>
                </div>                
                :
                <div>                    
                    <Route path="/login" component={Account}/>
                    <Route path="/sample" component={Sample}/>
                    <Route path="/staff" component={PageStaff}/>
                    <Route path="/user" component={Page}/>
                </div>
            }                              
            </Router>                    
        )
    }
}

export default App;