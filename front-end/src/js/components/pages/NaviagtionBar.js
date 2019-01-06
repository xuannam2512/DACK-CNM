import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"

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

    render() {
        return (
                <div className="container-fluid pl-0 pr-0">
                    <div className="row">
                        <div className="col-md-4 nav-right-box pl-0 pr-0">
                            <img src={logo} alt=""></img>
                        </div>                     
                        <div className="col-md-8 pl-0 pr-0 nav-left-box">
                            <div className="row nav-title">
                                No Money No Bank                             
                            </div>
                            
                            <div className="row nav-menu">
                                <div className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/" className="item">HOME</Link>                                
                                </div>
                                <div className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/about" className="item">ABOUT</Link>                                
                                </div>
                                <div className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/account" className="item">ACCOUNT</Link>
                                </div>
                                <div className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/receiver" className="item">RECEIVER</Link>
                                </div>
                                <div className="col-2 pl-0 pr-0 menu-item">
                                    <Link to="/contact" className="item">CONTACT</Link>
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