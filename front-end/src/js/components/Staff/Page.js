import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom"


//import component
import NavigationBar from './NaviagtionBar'
import Home from './Home'
import PageRegisterCustomer from '../Staff/PageRegisterCustomer'
import PageAddCustomer from '../Staff/PageAddCustomer'
import Footer from '../Staff/Footer'
import PageRecharge from '../Staff/PageRecharge'
//import css
import '../../../css/page.css'

class Page extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <Router>
               
                <div className="page-box">
                    <div className="container-fulid pr-0 pl-0">
                        <div className="row navigation-box mr-0 ml-0">
                            <NavigationBar />
                        </div>
                        <div className="row body-box mr-0 ml-0">
                            <Switch>
                                <Route exact path="/staff" component={Home} />       
                                <Route path="/staff/pageregistercustomer" component={PageRegisterCustomer} />
                                <Route path="/staff/pageaddcustomer" component={PageAddCustomer} /> 
                                <Route path="/staff/pagerecharge" component={PageRecharge} /> 
                                <Route component={ErrorPage} />                            
                            </Switch>                            
                        </div>
                        {/* <div className="row footer-box mr-0 ml-0">
                           
                        </div> */}
                         <Footer/>
                    </div>
                </div>
            </Router>            
        )
    }
}

class About extends Component {
    render() {
        return(
            <div>
                About
            </div>
        )
    }
}

class ErrorPage extends Component {
    render() {
        return(
            <div>
                Error
            </div>
        )
    }
}

export default Page;