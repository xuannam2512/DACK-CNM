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
import { withRouter } from "react-router-dom"

//import Typography from '@material-ui/core/Typography';

//import CSS
import '../../../css/payment.css'

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

// function getStepContent(stepIndex) {
//     switch (stepIndex) {
//         case 0:
//             return 'Account sender';
//         case 1:
//             return 'Account receiver';
//         case 2:
//             return 'Verify';
//         case 3: 
//             return 'Complete';
//         default:
//             return 'Uknown stepIndex';
//     }
// }

class Payment extends Component {

    constructor() {
        super();

        this.state = {
            activeStep: 1,
            isCheckAccount: true,
            accountNumber: "",
            code: "",
            money: 0
        }

        this.onchangeAccountNumber = this.onchangeAccountNumber.bind(this);
        this.handleChangeCode = this.handleChangeCode.bind(this);
    }

    handleNext = () => {        
        if(this.state.activeStep + 1 === 4)
        {
            alert("complete!!");
            this.props.history.push('/');
        }
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    onchangeAccountNumber = (e) => {     
        let str = "";
        let strNumber = "1234567890"
        if(this.state.accountNumber.length < e.target.value.length)
        {
            str = e.target.value;

            if (str.length === 4 || str.length === 11 || str.length === 18) {
                str = str + " - ";
                this.setState({
                    accountNumber: str
                });
            }

            if (strNumber.includes(str.charAt(str.length - 1)) && str.length <= 25) {
                this.setState({
                    accountNumber: str
                });
            }
        } else {            
            this.setState({
                accountNumber: e.target.value
            })
        }
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
                                        <TextField
                                            id="outlined-email-input"
                                            label="Account Number"
                                            className={classes.textField}
                                            type="text"
                                            name="account-number"
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            onChange={this.onchangeAccountNumber}
                                            value={this.state.accountNumber}
                                        />
                                    </div>
                                    <div className="col-3 check-account">
                                        <Button variant="contained" color="primary" className={classes.button}>
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
                                                    defaultValue="Le Xuan Nam"
                                                    className={classes.textField}
                                                    margin="normal"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </div>
                                            <div className="col-6 pl-0 pr-5">
                                                <TextField
                                                    id="standard-read-only-input"
                                                    label="Phone"
                                                    defaultValue="0346847957"
                                                    className={classes.textField}
                                                    margin="normal"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
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
                                <div className="row pl-3 pr-3 mt-4">
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
                                        onClick={this.handleClickMoney}
                                    />
                                </div>
                                <div className="row float-right pr-3 pl-3 mt-5 pt-5">
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
                                    <b className="mr-2">Sender Account: </b> 1234 - 5678 - 1234 - 1234
                                </div>
                                <div className="row complete-sender-account mt-3">
                                    <b className="mr-2">Reciever Account:</b>  1234 - 5678 - 1234 - 1234
                                </div>
                                <div className="row complete-sender-account mt-3">
                                    <b className="mr-2">Reciever Name:</b>  Le Xuan Nam
                                </div>
                                <div className="row complete-sender-account mt-3">
                                    <b className="mr-2">Amount:</b>  1.000.000 đ
                                </div>
                                <div className="row float-right pl-3 pr-5 mt-5">
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