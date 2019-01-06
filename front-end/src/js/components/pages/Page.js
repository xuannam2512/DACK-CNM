import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"


//import component
import NavigationBar from './NaviagtionBar'
import Home from './Home'
import Payment from './Payment'
import Receiver from './Receiver'
import AddReceiver from './AddReceiver'

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
                            <Route path="/account" component={Home} />
                            <Route path="/receiver/add" component={AddReceiver} />
                            <Route path="/receiver" component={Receiver} />                            
                            <Route component={ErrorPage} />                            
                        </Switch>                            
                    </div>
                    <div className="row footer-box mr-0 ml-0">
                        footer
                    </div>
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

export default Page;