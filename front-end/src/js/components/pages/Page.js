import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom"


//import component
import NavigationBar from './NaviagtionBar'
import Home from './Home'
import Payment from './Payment'

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
                    <div className="container-fluid pr-0 pl-0">
                        <div className="row navigation-box mr-0 ml-0">
                            <NavigationBar />
                        </div>
                        <div className="row body-box mr-0 ml-0">
                            <Switch>
                                <Route exact path="/" component={Home} />                                                       
                                <Route path="/about" component={About} />
                                <Route path="/payment" component={Payment} />
                                <Route component={ErrorPage} />                            
                            </Switch>                            
                        </div>
                        <div className="row footer-box mr-0 ml-0">
                            footer
                        </div>
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