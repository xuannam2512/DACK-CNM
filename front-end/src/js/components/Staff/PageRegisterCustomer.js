import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom"
//////////// START hải 2/1/////////////
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux'
import InputMask from 'react-input-mask';
import axios from 'axios';

//user
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames'
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
//////////// END hải 2/1/////////////
//import component
import NavigationBar from '../pages/NaviagtionBar'
import { SnackbarProvider, withSnackbar } from 'notistack';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    root: {
        flexGrow: 1,
       // marginTop: '100px'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        padding: '50px !important',
        margin: 'auto',
        maxWidth: 500,
    },affected: {
        textAlign: 'right',
    },    
});




class PageRegisterCustomer extends Component {
    constructor() {
        super();
        this.state = {
            xUserName:'',
            xFullName:'',
            xPhone:'',
            xMail:'',
            xPassword:'',
        }
        this._handleChange  = this._handleChange.bind(this)
        this._handleClickbtnRegister = this._handleClickbtnRegister.bind(this)
    }
    state = {
        age: '',
        name: 'hai',
        labelWidth: 0,
    };

    // componentDidMount() {
    //     this.setState({
    //         // labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    //     });
    // }

    _handleChange = name => event => {this.setState({[name]: event.target.value});};
    _handleClickbtnRegister = () =>{
        if (this.state.xUserName =='') this.props.enqueueSnackbar(`Message: UserName Invalid`, { variant :'warning' } );
        else if (this.state.xFullName =='') this.props.enqueueSnackbar(`Message: FullName Invalid`, { variant :'warning' } );
        else if (this.state.xPhone =='') this.props.enqueueSnackbar(`Message: Phone Invalid`, { variant :'warning' } );
        else if (this.state.xMail =='') this.props.enqueueSnackbar(`Message: Mail Invalid`, { variant :'warning' } );
        else if (this.state.xPassword =='') this.props.enqueueSnackbar(`Message: Password Invalid`, { variant :'warning' } )
        else
        {
            if(this.state.xMail.indexOf('@') > 0)
            {
                this.props.enqueueSnackbar(`Message: @ invalid characters`, { variant :'warning' } );
                return;
            }
                
            axios({
                method:'post',
                url: `http://localhost:3000/api/users`,
                data: {
                    username: this.state.xUserName,
                    fullname: this.state.xFullName,
                    phone: this.state.xPhone,
                    email: this.state.xMail,
                    password: this.state.xPassword,
                    permission: 1
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(res => {
                switch (res.status) {
                    case 201:
                    this.props.enqueueSnackbar(`Sign Up Success`,{ variant :'success' })
                        break;
                    case 203:
                    this.props.enqueueSnackbar(`Message: ${res.data.message}`, { variant :'warning' } );
                        break;
                    default:
                        break;
                }
            })
            .catch(err => {
                this.props.enqueueSnackbar(`Message: ${err.message}`, { variant :'error' } );
            })     
        }
        
    }
    render() {
        const { classes } = this.props;


    
        return (
            <Router>
                <div className="page-box">
                    <div className="container pr-0 pl-0">
                        <div className={classes.root}>
                            <Paper className={classes.paper}>
                                <Typography align="center" variant="h4">
                                    Register New Customer
                            </Typography>
                                <Grid item xs container direction="column" spacing={16}>

                                    <Grid item xs>
                                        <div style={{display : 'flex'}}>
                                            <div className="float-left pt-3" style={{ width: '40px' }}>
                                                <i style={{ color: '#303F9F' }} className="fa fa-user fa-2x pt-3 float-left" aria-hidden="true"></i>
                                            </div>
                                            <div className='w-100'>
                                                <TextField
                                                    value={this.state.xUserName}
                                                    onChange = {this._handleChange('xUserName')}
                                                    label="User Name"
                                                    className={classes.textField}
                                                    margin="normal"
                                                    fullWidth
                                                    style={{ margin: 8}}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div style={{display : 'flex'}}>
                                            <div className="float-left pt-3" style={{ width: '40px' }}>
                                                <i style={{ color: '#303F9F' }} className="fa fa-address-book fa-2x pt-3 float-left" aria-hidden="true"></i>
                                            </div>
                                            <div className= 'w-100'>
                                                <TextField
                                                    label="Full Name"
                                                    value={this.state.xFullName}
                                                    onChange = {this._handleChange('xFullName')}
                                                    className={classes.textField}
                                                    // autoComplete="current-password group float-left ml-2"
                                                    margin="normal"
                                                    fullWidth
                                                    style={{ margin: 8}}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div style={{display : 'flex'}}>
                                            <div className="float-left pt-3" style={{ width: '40px' }}>
                                                <i style={{ color: '#303F9F' }} className="fa fa-phone fa-2x pt-3 float-left" aria-hidden="true"></i>
                                            </div>
                                            <div className= 'w-100'>
                                                <InputMask {...this.props} mask="9999 999 999" maskChar=" " 
                                                        onChange = {this._handleChange('xPhone')}
                                                        value={this.state.xPhone}
                                                        >
                                                    <TextField
                                                        label="Phone"
                                                        className={classes.textField}
                                                        // value={this.state.xPhone}
                                                        // onChange = {this._handleChange('xPhone')}
                                                        margin="normal"
                                                        fullWidth
                                                        style={{ margin: 8 }}
                                                    />
                                                </InputMask>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                    <div style={{display : 'flex'}}>
                                        <div className="float-left pt-3" style={{ width: '40px' }}>
                                            <i style={{ color: '#303F9F' }} className="fa fa-envelope fa-2x pt-3 float-left" aria-hidden="true"></i>
                                        </div>
                                        <div className='d-flex align-items-end w-100'>
                                            <TextField
                                                type="email"
                                                label="Mail"
                                                className={classes.textField}
                                                value={this.state.xMail}
                                                onChange = {this._handleChange('xMail')}
                                                margin="normal"
                                                fullWidth
                                                style={{ margin: 8 }}
                                            />
                                            <Typography align="center " style={{fontSize:20 , fontWeight:350}} variant="p">
                                            @gmail.com
                                            </Typography>
                                        </div>
                                    </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div style={{display : 'flex'}}>
                                            <div className="float-left pt-3" style={{ width: '40px' }} >
                                                <i style={{ color: '#303F9F' }} className="fa fa-lock fa-2x pt-3 float-left" aria-hidden="true"></i>
                                            </div>
                                            <div className="w-100" >
                                                <TextField
                                                    id="standard-password-input"
                                                    label="Password"
                                                    className={classes.textField}
                                                    // autoComplete="current-password group float-left ml-2"
                                                    value={this.state.xPassword}
                                                    onChange = {this._handleChange('xPassword')}
                                                    type="password"
                                                    margin="normal"
                                                    fullWidth
                                                    style={{ margin: 8 }}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.affected}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type='summit'
                                                className={classNames(classes.margin, classes.cssRoot,classes.affected)}
                                                //onClick={()=>{ this.props.enqueueSnackbar(`Sign Up Success `) }}
                                                onClick={()=>{ this._handleClickbtnRegister() }}
                                            >
                                                Register UI Customer
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>

                        </div>

                        
                    </div>
                </div >
            </Router >
        )
    }
}

PageRegisterCustomer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(withSnackbar(PageRegisterCustomer)));
class About extends Component {
    render() {
        return (
            <div>
                About
            </div>
        )
    }
}

class ErrorPage extends Component {
    render() {
        return (
            <div>
                Error
            </div>
        )
    }
}



