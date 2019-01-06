import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from "react-router-dom"

//import css
import '../../../css/navigationbar.css'

//import image
import logo from '../../../image/logo2.png'

class NavigationBar extends Component
{
    constructor() {
        super();

        this.state = {

        }
    }


    // fnActive = name => event => {
    //     this.setState({ [name]: event.target.value });
    // };



    render() {

        
        return (
                <div className="container pl-0 pr-0 navigationBar">
                    <div className="row">
                        <div className="col-md-4 nav-right-box pl-0 pr-0">
                            <img src={logo}></img>
                        </div>                     
                        <div className="col-md-8 pl-0 pr-0 nav-left-box">
                            <div className="row nav-title">
                                No Money No Bank                             
                            </div>
                            
                            <div className="row nav-menu">
                                <div style={ {backgroundColor : window.location.pathname ==='/staff' ? 'rgba(107, 114, 118, 0.1)':'transparent' }} 
                                className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/staff" className="item" >HOME</Link>                                
                                </div>
                                <div style={ {backgroundColor : window.location.pathname ==='/staff/pageregistercustomer' ? 'rgba(107, 114, 118, 0.1)':'transparent' }} 
                                 className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/staff/pageregistercustomer" className="item">USER</Link>                                
                                </div>
                                <div style={ {backgroundColor : window.location.pathname ==='/staff/pageaddcustomer' ? 'rgba(107, 114, 118, 0.1)':'transparent' }} 
                                className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/staff/pageaddcustomer" className="item">AMOUNT</Link>
                                </div>
                                <div style={ {backgroundColor : window.location.pathname ==='/staff/pagerecharge' ? 'rgba(107, 114, 118, 0.1)':'transparent' }} 
                                className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/staff/pagerecharge" className="item">RECHARGE</Link>
                                </div>
                                
                                <div className="col-2 pl-0 pr-0">
                                    <div className="btn-logout">
                                        <button className="btn btn-defaul btn-primary">
                                            Logout
                                        </button>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>         
        )
    }
}

export default withRouter(NavigationBar);