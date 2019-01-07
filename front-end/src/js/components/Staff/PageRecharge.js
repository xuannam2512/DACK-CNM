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
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
//////////// END hải 2/1/////////////
//import component
import NavigationBar from '../pages/NaviagtionBar'
import Chip from '@material-ui/core/Chip';
import { enabled } from 'kleur';
import { SnackbarProvider, withSnackbar } from 'notistack';
// import active
import {loadUsers} from '../../actions/index'

const ExpansionPanel = withStyles({
    root: {
        //   border: '1px solid rgba(0,0,0,.125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    },
    expanded: {
        margin: 'auto',
    },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        //   backgroundColor: 'rgba(0,0,0,.03)',
        border: '2px solid rgba(0,0,0,.125)',
        borderRadius: '2%',
        display: 'block',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
            width: '100%',
        },
    },
    expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
}))(MuiExpansionPanelDetails);


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
        //marginTop: '100px'
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


// START TEXTCOMPLATE


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

 var sourceAccount = [
{account_number: "177907515924", user_id: 1, balance: 50000, date: "2019-01-06T21:06:47.000Z", status: 1},
{account_number: "311255196905", user_id: 1, balance: 50000, date: "2019-01-06T22:39:53.000Z", status: 1},
{account_number: "610699288604", user_id: 1, balance: 50000, date: "2019-01-06T21:04:43.000Z", status: 1}
];

class PageRecharge extends Component {
    constructor() {
        super();
        this.state = {
            xstatusMoney:'money50',
            xMoneyCustom : '',
            xUserName:'',
            xPhone:'',
            xMail:'',
            xUserID:'',
            xAccountName:'',
            xAccounts: [],
            googleDich:[],
        }
        this._handleChange  = this._handleChange.bind(this)
        this._handleClickbtnRegister = this._handleClickbtnRegister.bind(this)
        this._handleRestValue = this._handleRestValue.bind(this)
        this._handleChangeNameStatusMoney = this._handleChangeNameStatusMoney.bind(this)
    }
    _handleRestValue = ()  => {
        this.setState({xUserName : ''});
        this.setState({xMail: ''});
        this.setState({xPhone:''});
    
    };
    _handleChangeNameStatusMoney = (name,value)  =>{
        
        this.setState({ [name]: value });
    };
    _handleChange = name => event => {this.setState({[name]: event.target.value});};
    _handleClickbtnRegister = () =>{
        {
            if (this.state.xUserName =='') this.props.enqueueSnackbar(`Message: UserName Invalid`, { variant :'warning' } );
            else if (this.state.xMail =='') this.props.enqueueSnackbar(`Message: Enter in UserName`, { variant :'warning' } );
            else if (this.state.xPhone =='') this.props.enqueueSnackbar(`Message: Enter in UserName`, { variant :'warning' } );
            else if (this.state.xAccountName =='') this.props.enqueueSnackbar(`Message: Choose for Account`, { variant :'warning' } );
            else{
                var money ;
                if (this.state.xstatusMoney != 'moneycustom') {
                    
                    money = this.state.xstatusMoney.substring(5);
                    money *= 1000;
                    alert(money);
                } else {
                    money = this.state.xMoneyCustom;
                    alert(money);
                }
               
            axios({
                method:'post',
                url: `http://localhost:3000/api/transactions`,
                data: {
                    reciver_account_number: this.state.xAccountName,
                    sender_account_number:this.state.xAccountName,
                    amount: money,
                    type:0,
                    payments: 1
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
                    this.state.xPhone = this.setState.googleDich  = this.state.xAccountName =  ''  
                    this.props.enqueueSnackbar(`Successful recharge`,{ variant :'success' })
                    
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
                  this.setState({xMail : mail});
                  var phone ;
                   this.props._Users.map(d=>{if(d.username === ev.target.value) phone=  d.phone });
                  this.setState({xPhone : phone});
                  var userid ;
                  this.props._Users.map(d=>{if(d.username === ev.target.value) userid=  d.user_id });
                   this.setState({xUserID : userid});

                    // fill combobox list account
                    
                    axios({
                        method:'get',
                        url: `http://localhost:3000/api/users/${userid}/accounts/`,
                        data: {
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    })
                    .then(res => {
                     
                        console.log(res.data);
                        
                        sourceAccount = res.data;
                        this.setState({googleDich:res.data  });
                        console.log('data ::: ',this.state.googleDich);
                        
                    })
                    .catch(err => {
                        console.log(`Message : ${err.message}`, { variant :'error' } );
                    })   


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
            <Router>
                <div className="page-box">
                    <div className="container pr-0 pl-0">
                        <div className={classes.root}>
                            <Paper className={classes.paper}>
                                <Typography align="center" variant="h4">
                                    Pay In
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
                                                id="standard-password-input"
                                                label="Mail"
                                                disabled
                                                value={this.state.xMail}
                                                className={classNames(classes.textField,'float-left') }
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
                                                id="standard-password-input"
                                                label="Phone"
                                                disabled
                                                value={this.state.xPhone}
                                                className={classNames(classes.textField,'float-left') }
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
                                        <div className="float-left pt-3" style={{ width: '40px' }} >
                                            <i style={{ color: '#303F9F' }} className="fa fa-address-card fa-2x pt-3 float-left text-priamry" aria-hidden="true"></i>
                                        </div>
                                        <div className='w-100'>
                                        <FormControl className={classes.formControl}
                                            fullWidth
                                            style={{ margin: 8 }}
                                        >
                                            <InputLabel htmlFor="age-native-helper">Account</InputLabel>
                                            <NativeSelect
                                                className={classNames.normalhover}
                                                value={this.state.xAccountName}
                                                onChange={this._handleChange('xAccountName')}
                                                input={<Input name="permission" id="age-native-helper" />}
                                            >
                                                 <option value="" /> 
                                                {/* ({this.state.xAccounts}) = aa =>{
                                                   aa.map((station,index) => (
                                                    
                                                    <option key={index} value={station.account_number}>{station.account_number}</option>
                                                  ))
                                                } */}

                                                {
                                                    this.state.googleDich.map((station,index) => (
                                                    
                                                        <option key={index} value={station.account_number}>{station.account_number}</option>
                                                      ))
                                                }
                                                {/* <option value={10}>123-133-213-1323</option> */}
                                                {/* <option value={20}>244-244-2444-2444</option>
                                                <option value={30}>500-500-500-0555</option> */}
                                            </NativeSelect>
                                        </FormControl>
                                        </div>
                                    </div>
                                    </Grid>
                                    <Grid item xs>
                                    <Typography align="center" variant="h5" style={{marginBottom: 20}}>
                                        ___ Số tiền nạp ___
                                    </Typography>
                                    <Grid container spacing={24}>
                                            <Grid item xs>
                                                <Chip
                                                    label="50.000 VNĐ"
                                                    onChange={this.handleChangeNameStatusMoney}
                                                    className={classes.chip}
                                                    onClick={() => { this._handleChangeNameStatusMoney('xstatusMoney','money50') }}
                                                    clickable
                                                    value = '50000'
                                                    color={this.state.xstatusMoney === 'money50' ? 'secondary': 'primary'}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Chip
                                                    label="100.000 VNĐ"
                                                    className={classes.chip}
                                                    onClick={() => { this._handleChangeNameStatusMoney('xstatusMoney','money100') }}
                                                    clickable
                                                    value = '100000'
                                                    color={this.state.xstatusMoney === 'money100' ? 'secondary': 'primary'}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Chip
                                                    label="200.000 VNĐ"
                                                    className={classes.chip}
                                                    onClick={() => { this._handleChangeNameStatusMoney('xstatusMoney','money200') }}
                                                    clickable
                                                    value = '200000'
                                                    color={this.state.xstatusMoney === 'money200' ? 'secondary': 'primary'}
                                                />
                                            </Grid>
                                        </Grid>
                                    <Grid container spacing={24}>
                                            <Grid item xs>
                                                <Chip
                                                    label="500.000 VNĐ"
                                                    className={classes.chip}
                                                    onClick={() => { this._handleChangeNameStatusMoney('xstatusMoney','money500') }}
                                                    clickable
                                                    value = '500000'
                                                    color={this.state.xstatusMoney === 'money500' ? 'secondary': 'primary'}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Chip
                                                    label="Custom Pay in"
                                                    className={classes.chip}
                                                    onClick={() => { this._handleChangeNameStatusMoney('xstatusMoney','moneycustom') }}
                                                    clickable
                                                    value = '0'
                                                    color={this.state.xstatusMoney === 'moneycustom' ? 'secondary': 'primary'}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                               
                                            </Grid>
                                        </Grid>
                                        
                                        <Grid container spacing={24}>
                                        <Grid item xs>
                                            <TextField
                                            id="standard-password-input"
                                            disabled={this.state.xstatusMoney === 'moneycustom' ? false : true}
                                            value ={this.state.xMoneyCustom}
                                            onChange = {this._handleChange('xMoneyCustom') }
                                            label="Custom Money"
                                            className={classes.textField}
                                            type='number'  
                                            margin="normal"
                                            fullWidth
                                            style={{ margin: 8}}
                                        />
                                            </Grid>
                                        </Grid>
                                       
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.affected}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classNames(classes.margin, classes.cssRoot, classes.affected)}
                                                onClick={()=> {this._handleClickbtnRegister() } }
                                            >
                                                Pay In
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

PageRecharge.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withSnackbar(PageRecharge)));
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
