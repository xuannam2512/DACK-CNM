import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withRouter } from "react-router-dom";
import InputMask from 'react-input-mask';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios'
import NumberFormat from 'react-number-format'

//import Typography from '@material-ui/core/Typography';

//import CSS
import '../../../css/Payment.css'

const styles = theme => ({
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

function getSteps() {
    return ['Account sender', 'Account receiver and amount', 'Verify', 'Complete'];
}

class Payment extends Component {

    constructor() {
        super();

        this.state = {
            activeStep: 1,
            isCheckAccount: true,
            accountNumber: "",
            code: "",
            money: '',
            fullname: "",
            phone: "",
            email: "",
            isReceiverPay: false,
            senderAccount: "",
            transactionId: 0
        }

        this.onchangeAccountNumber = this.onchangeAccountNumber.bind(this);
        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.handleCheckAccount = this.handleCheckAccount.bind(this);
        this.handleOnchangePhone = this.handleOnchangePhone.bind(this);
        this.handleOnChangeFullname = this.handleOnChangeFullname.bind(this);
    }

    handleNext = () => {        
        
        if (this.state.activeStep + 1 === 2) {
            let receiverAccount = this.state.accountNumber.replace("-", '');
            receiverAccount = receiverAccount.replace("-", '');
            receiverAccount = receiverAccount.replace("-", '');

            if(this.state.accountNumber === '' || this.state.money === '')
            {
                alert("You didn't enter accout number or amount.");
            } else {
                axios({
                    method: 'post',
                    url: `http://localhost:3000/api/transactions`,
                    data: {
                        payments: this.state.isReceiverPay ? 0 : 1,
                        sender_account_number: this.state.senderAccount,
                        reciver_account_number: receiverAccount,
                        amount: this.state.money,
                        type: 1
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('access_token')
                    }
                })
                    .then(res => {
                        console.log(res);
                        if (res.status === 202) {
                            alert("Your account is not enough money")
                        }

                        if (res.status === 201) {
                            this.setState({
                                transactionId: res.data.insertId
                            });

                            axios({
                                method: 'post',
                                url: `http://localhost:3000/api/transactions/code/generate`,
                                data: {
                                    transaction_id: res.data.insertId,
                                    email: this.state.email,
                                    name: this.state.fullname
                                },
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-access-token': localStorage.getItem('access_token')
                                }
                            })
                                .then(res => {
                                    if (res.status === 201) {
                                        this.setState(state => ({
                                            activeStep: state.activeStep + 1,
                                        }));
                                    }
                                })
                                .catch(err => {
                                    if (err.response.status === 401) {
                                        axios({
                                            method: 'post',
                                            url: `http://localhost:3000/api/authen/accesstoken`,
                                            data: {
                                                refesh_token: localStorage.getItem("refresh_token")
                                            },
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                            .then(res => {
                                                localStorage.setItem('access_token', res.data.access_token)
                                                this.handleNext();
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })
                                    }
                                })
                        }

                    })
                    .catch(err => {
                        if (err.response.status === 401) {
                            axios({
                                method: 'post',
                                url: `http://localhost:3000/api/authen/accesstoken`,
                                data: {
                                    refesh_token: localStorage.getItem("refresh_token")
                                },
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then(res => {
                                    localStorage.setItem('access_token', res.data.access_token)
                                    this.handleNext();
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        }
                    })
            }
        }

        if(this.state.activeStep + 1 === 3)
        {
            if(this.state.code === '')
            {
                alert("Code is empty!");
            } else {
                axios({
                    method:'post',
                    url: `http://localhost:3000/api/transactions/code/verify`,
                    data: {
                        transaction_id: this.state.transactionId,
	                    code: this.state.code
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('access_token')
                    }
                })
                .then(res => {
                    if(res.status === 201)
                    {
                        this.setState(state => ({
                            activeStep: state.activeStep + 1,
                        }))
                    }
                    if(res.status === 202)
                    {
                        alert("Code is incorrect!!");
                    }
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        axios({
                            method: 'post',
                            url: `http://localhost:3000/api/authen/accesstoken`,
                            data: {
                                refesh_token: localStorage.getItem("refresh_token")
                            },
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(res => {
                                localStorage.setItem('access_token', res.data.access_token)
                                this.handleNext();
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
            }

        }

        if(this.state.activeStep + 1 === 4)
        {
            alert("complete!!");
            this.props.history.push('/');
        }
    };

    onchangeAccountNumber = (e) => {     
        this.setState({
            accountNumber: e.target.value
        });
    }

    handleChangeCode = (e) => {
        this.setState({
            code: e.target.value
        })
    }

    handleChangeMoney = (e) => {
        this.setState({
            money: e.target.value
        });
    }

    handleClickMoney = (e) => {
        this.setState({
            money: ""
        })
    }

    handleOnChangeFullname = (e) => {
        this.setState({
            fullname: e.target.value
        })
    }

    handleOnchangePhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    handleCheckAccount = () => {
        let accountNumber = this.state.accountNumber.replace("-", '');
        accountNumber = accountNumber.replace("-", '');
        accountNumber = accountNumber.replace("-", '');

        axios({
            method:'get',
            url: `http://localhost:3000/api/users/account/${accountNumber}`,
            headers: {
                'x-access-token': localStorage.getItem('access_token')
            }
        })
        .then(res => {
            this.setState({
                fullname: res.data.fullname,
                phone: res.data.phone,
                email: res.data.email
            });
        })
        .catch(err => {
            if (err.response.status === 401) {
                axios({
                    method: 'post',
                    url: `http://localhost:3000/api/authen/accesstoken`,
                    data: {
                        refesh_token: localStorage.getItem("refresh_token")
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        localStorage.setItem('access_token', res.data.access_token)
                        this.handleCheckAccount();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }

    handleOnCheck = (index) => {
        console.log(index);
        if(index === 1)
        {
            this.setState({
                isReceiverPay: !this.state.isReceiverPay
            })
        }

        if(index === 2)
        {
            this.setState({
                isReceiverPay: !this.state.isReceiverPay
            })
        }
    }

    componentDidMount() {
        this.setState({
            senderAccount: this.props.match.params.accountNumber
        });
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className="container-fluid mr-0 ml-0 bg-light payment-box">
                <div className="row progress-bar-custom mr-0 ml-0">
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map(label => {
                                return <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>;
                            })}
                        </Stepper>                       
                    </div>
                </div>
                {
                    this.state.activeStep === 1
                    ?
                        <div className="row account-reciver mr-0 ml-0 mt-4">
                            <div className="col-6 pl-0 pr-0 border-right">
                                <div className="row mr-0 ml-0 sender-account-title">
                                    Input account number
                            </div>
                                <div className="row mr-0 ml-0 sender-account-number">
                                    <div className="col-9 pl-0">
                                    <InputMask {...this.props} mask="999-999-999-999" maskChar="-" 
                                        onChange={this.onchangeAccountNumber}
                                        value={this.state.accountNumber}
                                    >
                                        {() => <TextField
                                            id="outlined-email-input"
                                            label="Account Number"
                                            className={classes.textField}
                                            type="text"
                                            name="account-number"
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth                                            
                                        />}
                                    </InputMask>                                        
                                    </div>
                                    <div className="col-3 check-account">
                                        <Button variant="contained" 
                                        color="primary" 
                                        className={classes.button}
                                        onClick={() => {this.handleCheckAccount()}}
                                        >
                                            Check
                                        </Button>
                                    </div>
                                </div>
                                {
                                    this.state.isCheckAccount
                                        ?
                                        <div className="row mr-0 ml-0 sender-account-balance">
                                            <div className="col-6 pl-0 pr-5">
                                                <TextField
                                                    id="standard-read-only-input"
                                                    label="Full name"
                                                    value={this.state.fullname}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                    onChange={this.handleOnChangeFullname}
                                                />
                                            </div>
                                            <div className="col-6 pl-0 pr-5">
                                                <TextField
                                                    id="standard-read-only-input"
                                                    label="Phone"
                                                    value={this.state.phone}
                                                    className={classes.textField}
                                                    margin="normal"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                    onChange={this.handleOnChangePhone}
                                                />
                                            </div>
                                        </div>
                                        :
                                        <div></div>
                                }
                            </div>
                            <div className="col-6">
                                <div className="row mr-0 ml-0 sender-account-title">
                                    Input amount
                            </div>
                                <div className="row pl-3 pr-3 mt-0">   
                                    <TextField
                                        label="Money"
                                        id="simple-start-adornment"
                                        type="number"
                                        className={classNames(classes.margin, classes.textField)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                                        }}
                                        fullWidth
                                        value={this.state.money}
                                        onChange={this.handleChangeMoney}                                        
                                    />                                                                   
                                </div>
                                <div className="row mt-4">
                                    <div className="col-6">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.isReceiverPay}
                                                    onClick={() => {this.handleOnCheck(1)}}                                                    
                                                    color="primary"
                                                />
                                            }
                                            label="Receiver Pay"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={!this.state.isReceiverPay}
                                                    onClick={() => {this.handleOnCheck(2)}}                                                    
                                                    color="primary"
                                                />
                                            }
                                            label="Sender Pay"
                                        />
                                    </div>
                                </div>
                                <div className="row float-right pr-3 pl-3 pt-5">
                                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    :
                    this.state.activeStep === 2
                    ?
                        <div className="row verify-box ml-0 mr-0 mt-4">
                            <div className="col-12">
                                <div className="row verify-title">
                                    Check email to verify
                                </div>
                                <div className="row">
                                        <div className="col-10">
                                            <TextField
                                                id="outlined-email-input"
                                                label="Code"
                                                className={classes.textField}
                                                type="text"
                                                name="code"                                                
                                                margin="normal"
                                                variant="outlined"
                                                value={this.state.code}
                                                onChange={this.handleChangeCode}
                                                fullWidth
                                            />
                                        </div>
                                    <div className="col-2 resend-btn">
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            Resend
                                        </Button>
                                    </div>
                                </div>
                                <div className="row float-right pl-3 pr-5 mt-5">
                                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    :
                        <div className="row compelete-box ml-0 mr-0 mt-4">
                            <div className="col-12">
                                <div className="row complete-title mt-4 text-primary">
                                    <h1>COMPLETE!!!</h1>
                                </div>
                                <div className="row complete-sender-account mt-3">
                                    <b className="mr-2">Sender Account: </b> 
                                    <NumberFormat
                                        value={this.state.senderAccount}
                                        format="###-###-###-###"
                                        className="sender-account-complete"
                                    ></NumberFormat>
                                </div>
                                <div className="row complete-sender-account mt-3">
                                    <b className="mr-2">Reciever Account:</b>  {this.state.accountNumber}
                                </div>
                                <div className="row complete-sender-account mt-3">
                                    <b className="mr-2">Reciever Name:</b>  {this.state.fullname}
                                </div>
                                <div className="row complete-sender-account mt-3">
                                    <b className="mr-2">Amount:</b>  {this.state.money} đ
                                </div>
                                <div className="row float-right pl-3 pr-5 mt-5 mb-3">
                                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                }             
            </div>
        )
    }
}

Payment.propTypes = {
    classes: PropTypes.object,
};

export default withRouter(withStyles(styles)(Payment));