import React, { Component } from 'react'
import { connect } from "react-redux"
import NumberFormat from 'react-number-format'
import Pagination from "react-js-pagination"
import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from "react-router-dom"


//import css
import '../../../css/footer.css'

//import image
// import bankLogo from '../../../image/logo2.png'


class Footer extends Component {
    constructor(props) {
        super(props);

    
    }


    render() {
        return (
        <div className="container">
             {/* Footer */}
      <footer className="page-footer font-small unique-color-dark" style={{backgroundColor:'#1C2331'}}>
        <div style={{backgroundColor: '#6351ce'}}>
          <div className="container">
            {/* Grid row*/}
            <div className="row py-4 d-flex align-items-center">
              {/* Grid column */}
              <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                <h6 className="mb-0">Get connected with us on social networks!</h6>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-6 col-lg-7 text-center text-md-right">
                {/* Facebook */}
                <a className="fb-ic">
                  <i className="fa fa-facebook-f white-text mr-4"> </i>
                </a>
                {/* Twitter */}
                <a className="tw-ic">
                  <i className="fa fa-twitter white-text mr-4"> </i>
                </a>
                {/* Google +*/}
                <a className="gplus-ic">
                  <i className="fa fa-google-plus white-text mr-4"> </i>
                </a>
                {/*Linkedin */}
                <a className="li-ic">
                  <i className="fa fa-linkedin white-text mr-4"> </i>
                </a>
                {/*Instagram*/}
                <a className="ins-ic">
                  <i className="fa fa-instagram white-text"> </i>
                </a>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row*/}
          </div>
        </div>
        {/* Footer Links */}
        <div className="container text-center text-md-left mt-5" >
          {/* Grid row */}
          <div className="row mt-3">
            {/* Grid column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* Content */}
              <h6 className="text-uppercase font-weight-bold">NHD BANKING</h6>
              <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}} />
              <p>Money is not everything, but the lack of it is very headach.</p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-9 col-lg-8 col-xl-9 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase font-weight-bold">Contact</h6>
              <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}} />
              <p>
                <i className="fa fa-home mr-3" />BÌNH THẠNH, TP HỒ CHÍ MINH</p>
              <p>
                <i className="fa fa-envelope mr-3" />info@nhdbanking.com</p>
              <p>
                <i className="fa fa-phone mr-3" /> + 01 234 567 88</p>
              <p>
                <i className="fa fa-print mr-3" /> + 01 234 567 89</p>
            </div>
            {/* Grid column */}
             {/* Grid column */}
             <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            </div>
            {/* Grid column */}
             {/* Grid column */}
             <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        {/* Footer Links */}
        {/* Copyright */}
        <div className="footer-copyright text-center py-3" style={{backgroundColor:'#161C27'}}>© 2018 
          <a href="#javascript:;"> NHD BANKING</a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}

        </div>
      )
    }

}

export default Footer;