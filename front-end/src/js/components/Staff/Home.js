import React, { Component } from 'react'
import { connect } from "react-redux"
import NumberFormat from 'react-number-format'
import Pagination from "react-js-pagination"
import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from "react-router-dom"


//import css
import '../../../css/Home.css'

//import image
import bankLogo from '../../../image/logo2.png'
import { Grid } from '@material-ui/core';




class Home extends Component {
    constructor(props) {        
        super(props);

    }

   

    render() {                         

        
        return (
           <div className='container'>
           {/* <Grid>

           </Grid> */}
           </div>
        )
    }
}

export default Home;