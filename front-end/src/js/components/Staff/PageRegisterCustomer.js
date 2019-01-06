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
        marginTop: '100px'
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


const mapStateToProps = state => {
    return {
        xuser: state.xuser,
        xfullname: state.xfullname,
        xphone: state.xphone,
        xmail: state.xmail,
        xpassword: state.xpassword
    };
};


class PageRegisterCustomer extends Component {
    constructor() {
        super();
        this.state = {
        }
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

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

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
                                                    id="standard-password-input"
                                                    label="User Name"
                                                    // value={this.props.xuser}
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
                                                <i style={{ color: '#303F9F' }} className="fa fa-address-book fa-2x pt-3 float-left" aria-hidden="true"></i>
                                            </div>
                                            <div className= 'w-100'>
                                                <TextField
                                                    id="standard-password-input"
                                                    label="Full Name"
                                                    // value={this.props.xfullname}
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
                                                <TextField
                                                    id="standard-password-input"
                                                    label="Phone"
                                                    className={classes.textField}
                                                    // autoComplete="current-password group float-left ml-2"
                                                    margin="normal"
                                                    fullWidth
                                                    style={{ margin: 8 }}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                    <div style={{display : 'flex'}}>
                                        <div className="float-left pt-3" style={{ width: '40px' }}>
                                            <i style={{ color: '#303F9F' }} className="fa fa-envelope fa-2x pt-3 float-left" aria-hidden="true"></i>
                                        </div>
                                        <div className='w-100'>
                                            <TextField
                                                id="standard-password-input"
                                                label="Mail"
                                                className={classes.textField}
                                                // autoComplete="current-password group float-left ml-2"
                                                margin="normal"
                                                fullWidth
                                                style={{ margin: 8 }}
                                            />
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
                                                className={classNames(classes.margin, classes.cssRoot,classes.affected)}
                                                onClick={()=>{ this.props.enqueueSnackbar('Register completely !!!') }}
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

export default connect(mapStateToProps)(withStyles(styles)(withSnackbar(PageRegisterCustomer)));
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
