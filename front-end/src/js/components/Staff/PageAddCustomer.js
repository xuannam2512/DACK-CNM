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
import MenuItem from '@material-ui/core/MenuItem';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
//////////// END hải 2/1/////////////
//import component
import NavigationBar from '../pages/NaviagtionBar'
// notification
import { SnackbarProvider, withSnackbar } from 'notistack';
// import active
import {loadUsers} from '../../actions/index'


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
    }, affected: {
        textAlign: 'right',
    }, xcontainer: {
        flexGrow: 1,
        position: 'relative',
    },
    xpaper: {
        position: 'absolute',
        zIndex: 1,
        // marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },

    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },

});






const mapStateToProps = state => {
    return {
        _Users: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadUsers: users => {
            return dispatch(loadUsers(users));
        } 
    };
};


class PageAddCustomer extends Component {
    constructor() {
        super();
        this.state = {
            xUserName:'',
            xPhone:'',
            xMail:'',
            xUserID: '',
        }
        this._handleChange  = this._handleChange.bind(this)
        this._handleClickbtnRegister = this._handleClickbtnRegister.bind(this)
        this._handleRestValue = this._handleRestValue.bind(this)

    }
   
    _handleRestValue = ()  => {
        this.setState({xUserName : ''});
        this.setState({xMail: ''});
        this.setState({xPhone:''});
    
    };
    _handleChange = name => event => {this.setState({[name]: event.target.value});};
    _handleClickbtnRegister = () =>{
        {
            if (this.state.xUserName =='') this.props.enqueueSnackbar(`Message: UserName Invalid`, { variant :'warning' } );
            else if (this.state.xMail =='') this.props.enqueueSnackbar(`Message: Enter in UserName`, { variant :'warning' } );
            else if (this.state.xPhone =='') this.props.enqueueSnackbar(`Message: Enter in UserName`, { variant :'warning' } );
            else{     
            axios({
                method:'post',
                url: `http://localhost:3000/api/accounts`,
                data: {
                    user_id: this.state.xUserID,
                    balance: 50000
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(res => {
                switch (res.status) {
                    case 201:
                    this._handleRestValue();
                    this.state.xUserName  = this.state.xUserID = this.state.xMail = 
                    this.state.xPhone = ''  
                    this.props.enqueueSnackbar(`Create a new account successfully`,{ variant :'success' })
                    console.log('daaa  :: ',res.data);
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
    }
    componentDidMount() {
        axios({
            method:'get',
            url: `http://localhost:3000/api/users`,
            data: {
            },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(res => {
             this.props.loadUsers(res.data);
        })
        .catch(err => {
            console.log(`Message : ${err.message}`, { variant :'error' } );
        })   
    
    
    
    }


    // START TEXTCOMPLATE

 renderInput = (_this,inputProps) => {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (

        <TextField
            InputProps={{
                inputRef: ref,
                ...InputProps,
            }}
            id="standard-password-input"
            label="User Name"
            margin="normal"
            //value={this.state.xUserName}
            //onChange = {console.log('xUserName :: ',this.state.xUserName)}
            onKeyDown ={(ev) => {
                if (ev.key === 'Enter') {
                  // Do code here
                  
                  this.setState({ xUserName : ev.target.value}) 
                  var mail ;
                  this.props._Users.map(d=>{if(d.username === ev.target.value) mail =  d.email });
                  console.log(mail);
                  this.setState({xMail : mail});
                  var phone ;
                   this.props._Users.map(d=>{if(d.username === ev.target.value) phone=  d.phone });
                  this.setState({xPhone : phone});
                  var userid ;
                  this.props._Users.map(d=>{if(d.username === ev.target.value) userid=  d.user_id });
                   this.setState({xUserID : userid});

                   
                  ev.preventDefault();
                }
              }}
            fullWidth
            style={{ margin: 8 }}
        />
    );
}

propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

 renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.username) > -1;
    return (
        <MenuItem
            {...itemProps}
            key={suggestion.username}
            selected={isHighlighted}
            component="div"
           // onClick= {  console.log(itemProps)  }
        style={{
          fontWeight: isSelected ? 500 : 400,
          
        }}
        >
             {suggestion.username} 
        </MenuItem>
    );
}

 getSuggestions = (value, _this) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    
    return inputLength === 0
        ? []
        : _this.props._Users.filter(suggestion => {
            const keep =
                 suggestion.username.slice(0, inputLength).toLowerCase() === inputValue ;
            
            
            if (keep) {
                count += 1;
            }
            return keep;
        }
        
        );
}
// END TEXTCOMPLATE


    render() {
        const { classes } = this.props;

        return (
                <div className="page-box">
                    <div className="container pr-0 pl-0">
                        <div className={classes.root}>
                            <Paper className={classes.paper}>
                                <Typography align="center" variant="h4">
                                Apply for a Credit Card
                                </Typography>
                                <Grid item xs container direction="column" spacing={16}>

                                    <Grid item xs style={{ height: '80px ' }}>
                                    <div style={{display : 'flex'}}>
                                        <div className="float-left pt-3" style={{ width: '40px ' }}>
                                            <i style={{ color: '#303F9F' }} className="fa fa-user fa-2x pt-3 float-left" aria-hidden="true"></i>
                                        </div>
                                        <Downshift id="downshift-simple">
                                            {({
                                                getInputProps,
                                                getItemProps,
                                                getMenuProps,
                                                highlightedIndex,
                                                inputValue,
                                                isOpen,
                                                selectedItem,
                                            }) => (
                                                    <div className={classNames(classes.xcontainer,'w-100')}>
                                                        {this.renderInput(this,{
                                                            classes,
                                                            InputProps: getInputProps({
                                                                placeholder: 'Search full name',
                                                            }),
                                                        })}
                                                        <div {...getMenuProps()}>
                                                            {isOpen ? (
                                                                 <Paper className={classes.xpaper} square>
                                                                    {this.getSuggestions(inputValue,this).map((suggestion, index) =>
                                                                        this.renderSuggestion({
                                                                            suggestion,
                                                                            index,
                                                                            itemProps: getItemProps({ item: suggestion.username }),
                                                                            highlightedIndex,
                                                                            selectedItem,
                                                                        }),
                                                                    )}
                                                                </Paper>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                )}
                                        </Downshift>
                                        </div>
                                    </Grid>
                                   
                                      <Grid item xs>
                                        <div style={{display : 'flex'}}>
                                            <div className="float-left pt-3" style={{ width: '40px' }}>
                                                <i style={{ color: '#303F9F' }} className="fa fa-envelope fa-2x pt-3 float-left" aria-hidden="true"></i>
                                            </div>
                                            <div className='w-100'>
                                                <TextField
                                                    disabled
                                                     value={this.state.xMail}
                                                    //onChange = {this._handleChange('xMail')}
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
                                            <div className="float-left pt-3" style={{ width: '40px' }}>
                                                <i style={{ color: '#303F9F' }} className="fa fa-phone fa-2x pt-3 float-left" aria-hidden="true"></i>
                                            </div>
                                            <div className='w-100'>
                                                <TextField
                                                    disabled
                                                    label="Phone"
                                                    value={this.state.xPhone}
                                                    //onChange = {this._handleChange('xPhone')}
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
                                        <div className={classes.affected}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classNames(classes.margin, classes.cssRoot, classes.affected)}
                                                onClick={()=>{ this._handleClickbtnRegister() }}
                                            >
                                                Register UI Acount
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>

                        </div>


                    </div>
                </div >
        )
    }
}

PageAddCustomer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProps )(withStyles(styles)(withSnackbar(PageAddCustomer)));

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
