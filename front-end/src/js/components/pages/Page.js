import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import {Grid, Row, Col} from "react-bootstrap"

//import component
import NavigationBar from './NaviagtionBar'
import Home from './Home'
import Payment from './Payment'
import Receiver from './Receiver'
import AddReceiver from './AddReceiver'
import TransactionHistory from './TransactionHistory'
import TransactionDetail from './TransactionDetail'

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
                            <Route path="/payment/:accountNumber" component={Payment} />
                            <Route path="/account" component={Home} />
                            <Route path="/receiver/add" component={AddReceiver} />
                            <Route path="/receiver" component={Receiver} />                            
                            <Route path="/contact" component={Contact} />
                            <Route path="/transaction/history" component={TransactionHistory} />
                            <Route path="/transaction/detail" component={TransactionDetail} />                         
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
                <h3><b>About the bank</b></h3>
                <img class="about-image" src={require("../../../image/ic_address.png")} />
                <span><b> 227 Nguyễn Văn Cừ, phường 4, quận 5, thành phố Hồ Chí Minh</b></span><br/>
                <img class="about-image" src={require("../../../image/ic_phone.png")} />
                <span><b> 0123456789</b></span><br/>
                <img class="about-image" src={require("../../../image/ic_email.png")} />
                <span><b> contact@nhdbanking.com</b></span><br/>


                <a href="https://www.facebook.com" target="_blank">
                    <img class="about-image" src={require("../../../image/ic_facebook.png")} />
                </a>
                <a href="https://plus.google.com" target="_blank">
                    <img class="about-image" src={require("../../../image/ic_google.png")} />
                </a>
                <a href="https://twitter.com" target="_blank">
                    <img class="about-image" src={require("../../../image/ic_twitter.png")} />
                </a>
            </div>
        )
    }
}

class Contact extends Component {
    render() {
        return(
            <div>
                <h3><b>Contact us</b></h3>
                <div>
                    <Grid>
                        <Row>
                            <Col xs={12} md={4}>
                                <img class="avatar-image" src={require("../../../image/ducnh.jpg")}/>
                                <h4 class="name"><b>Nguyễn Hoài Đức</b></h4>
                                <img class="contact-image" src={require("../../../image/ic_phone.png")}/>
                                <span><b> 0123456789</b></span><br/>
                                <img class="contact-image" src={require("../../../image/ic_email.png")}/>
                                <span><b> ducnh@nhdbanking.com</b></span>
                            </Col>
                            <Col xs={12} md={4}>
                                <img class="avatar-image" src={require("../../../image/haidvt.jpg")}/>
                                <h4 class="name"><b>Đinh Văn Tuấn Hải</b></h4>
                                <img class="contact-image" src={require("../../../image/ic_phone.png")}/>
                                <span><b> 0147258369</b></span><br/>
                                <img class="contact-image" src={require("../../../image/ic_email.png")}/>
                                <span><b> haidvt@nhdbanking.com</b></span>
                            </Col>
                            <Col xs={12} md={4}>
                                <img class="avatar-image" src={require("../../../image/namlx.jpg")}/>
                                <h4 class="name"><b>Lê Xuân Nam</b></h4>
                                <img class="contact-image" src={require("../../../image/ic_phone.png")}/>
                                <span><b> 0159753654</b></span><br/>
                                <img class="contact-image" src={require("../../../image/ic_email.png")}/>
                                <span><b> namlx@nhdbanking.com</b></span>
                            </Col>
                        </Row>
                    </Grid>
                </div>

            </div>
        )
    }
}

export default Page;