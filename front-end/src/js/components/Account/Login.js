import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PasswordCircle from '@material-ui/icons/Lock'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Recaptcha from 'react-recaptcha'
import axios from 'axios';

//redux
import { connect } from "react-redux";
//action
import { login } from '../../actions/index'

//import css
import '../../../css/login.css'

//import image
import logo from '../../../image/logo2.png'



const mapDispatchToProps = dispatch => {
    return {
        login: loginEntity => {
            return dispatch(login(loginEntity));
        } 
    };
};


class Login extends Component {

    constructor() {
        super();

        this._handleTextFieldChangeUsername = this._handleTextFieldChangeUsername.bind(this);
        this._handleTextFieldChangePassoword = this._handleTextFieldChangePassoword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);

        this.state = {
            username: "",
            password: "",
            isVerified: false
        }
    }

    _handleTextFieldChangeUsername = (e) => {
        this.setState({
            username: e.target.value            
        });
    }

    _handleTextFieldChangePassoword = (e) => {
        this.setState({            
            password: e.target.value
        });
    }

    handleLogin = () => {    
      
        axios({
            method:'post',
            url: `http://localhost:3000/api/users/login`,
            data: {
                username: this.state.username,
	            password: this.state.password
            },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(res => {           
            if (this.state.isVerified) {
                localStorage.setItem('refresh_token', res.data.refreshToken);
                localStorage.setItem('access_token', res.data.accessToken);
                this.props.login(res.data);
                alert("Logined");
            } else {
                alert("you are not verified!");
            }
        })
        .catch(err => {
            console.log(err);
        })         
    }

    //recapcha
    onloadCallback = () => {
        console.log("Recapcha is loaded!");
    }

    verifyCallback = res => {
        if(res)
        {
            this.setState({
                isVerified: true
            })
        }
    }

    render() {
        //const { classes } = this.props;
        return (
            <div>
                <div className="container login">
                    <div className="btn-register">
                        Register
                    </div>
                    <div className="row">
                        <div className="image-box">
                            <img src={logo} alt=""></img>
                        </div>
                    </div>   
                    <div className="row mt-3">
                        <Grid container 
                            spacing={24} 
                            alignItems="flex-end"
                            >
                            <Grid item xs={1}>
                                <AccountCircle/>
                            </Grid>
                            <Grid item xs={11}>                                
                                <TextField  ref="username"
                                            value={this.state.username}
                                            onChange={this._handleTextFieldChangeUsername}
                                            label="Username"                                             
                                            fullWidth                                              
                                            />
                            </Grid>
                        </Grid>                        
                    </div>   
                    <div className="row mt-4">
                        <Grid container
                            spacing={24}
                            alignItems="flex-end"
                        >
                            <Grid item xs={1}>
                                <PasswordCircle/>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField  ref="password"
                                    value={this.state.password}
                                    onChange={this._handleTextFieldChangePassoword}
                                    label="Password"
                                    type="password"
                                    fullWidth                                    
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="row mt-2">
                        <FormControlLabel
                            control={
                                <Checkbox               
                                    value="checkedB"
                                    color="primary"                                                         
                                />
                            }
                            label="Remember me!!"
                            
                        />
                        <div className="w-50 mt-2 ml-5">
                            <span className="float-right">Forgot password?</span>
                        </div>
                    </div> 
                    <div className="row">
                        <div className="recapcha-box">
                            <Recaptcha
                                sitekey="6Le7BoUUAAAAAIEx2rkvA70tvlQaJClPIKGcFSUJ"
                                render="explicit"
                                onloadCallback={this.onloadCallback}
                                verifyCallback={this.verifyCallback}
                            />
                        </div>                        
                    </div>
                    <div className="row mt-2">
                        <button type="button" className="btn-custom w-100" onClick={() => {this.handleLogin()}}>
                            Login
                        </button>
                    </div>             
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Login);