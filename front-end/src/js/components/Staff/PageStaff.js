import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"


//import component
import NavigationBar from './NaviagtionBar'
import Home from './Home'
import PageAddCustomer from './PageAddCustomer'
import PageRecharge from './PageRecharge'
import PageRegisterCustomer from './PageRegisterCustomer'
import Footer from './Footer'
//import css
import '../../../css/page.css'

class PageStaff extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <div className="page-box">
                <div className="container-fluid pr-0 pl-0">
                    <div className="row navigation-box mr-0 ml-0">
                         <NavigationBar /> 
                    </div>
                    <div className="row body-box mr-0 ml-0">
                        <Switch>
                            <Route exact path="/" component={Home} />                                                       
                            <Route path="/pageaddcustomer" component={PageAddCustomer} />
                            <Route path="/pageregistercustomer" component={PageRegisterCustomer} />
                            <Route path="/pagerecharge" component={PageRecharge} />                       
                            <Route component={ErrorPage} />                            
                        </Switch>                            
                    </div>
                    <Footer/>
                </div>
            </div>         
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

export default PageStaff;