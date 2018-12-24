import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PasswordCircle from '@material-ui/icons/Lock'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'

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
            console.log("login action");
            return dispatch(login(loginEntity));
        } 
    };
};


class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
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
        let loginEntity = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.login(loginEntity);

        alert("Login " + loginEntity.username + " password: " + loginEntity.password);
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
                            <img src={logo}></img>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="title-box">
                            <h2>Login to continue</h2>
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
                                <TextField id="input-with-icon-grid" 
                                            ref="username"
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
                                <TextField id="input-with-icon-grid"
                                    ref="password"
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
                            <a className="float-right">Forgot password?</a>
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