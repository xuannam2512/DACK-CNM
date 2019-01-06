import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom'
import InputMask from 'react-input-mask';
import { connect } from 'react-redux'
import axios from 'axios'

import { addReceiver } from '../../actions/index'

//import css
import '../../../css/AddReceiver.css'


const mapDispatchToProps = dispatch => {
    return {
        addReceiver: receiver => {
            return dispatch(addReceiver(receiver));
        }
    };
};

const mapStateToProps = state => {
    return { 
        userId: state.userId
    };
};

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class AddReceiver extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            accountNumber: "",
            remiderName: ""
        }

        this.handleChangeRemiderName = this.handleChangeRemiderName.bind(this);
        this.handleOnchangeAccountNumber = this.handleOnchangeAccountNumber.bind(this);
    }

    handleOnchangeAccountNumber = (e) => {
        this.setState({
            accountNumber: e.target.value
        })
    }

    handleChangeRemiderName = (e) => {
        this.setState({
            remiderName: e.target.value
        })
    }

    handleAddReceiver = () => {
        alert("Add");   
        let receiver = {
            reciver_account_number: this.state.accountNumber,
            user_id: this.props.userId,
            remider_name: this.state.remiderName
        }
        let accountNumber = this.state.accountNumber.replace("-", '');
        accountNumber = accountNumber.replace("-", '');
        accountNumber = accountNumber.replace("-", '');

        axios({
            method:'post',
            url: `http://localhost:3000/api/recievers`,
            data: {
                reciver_account_number: accountNumber,
                user_id: this.props.userId,
                remider_name: this.state.remiderName
            },
            headers: {
                'x-access-token': localStorage.getItem('access_token'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            this.props.addReceiver(receiver);
            this.props.history.push('/receiver');  
        })
        .catch(err => {
            alert("Account is incorrect!");
            console.log(err);
        })        
    }

    render() {
        const { classes } = this.props;
        return(
            <div className="container-fluid pl-0 pr-0 add-receiver-box">
                <div className="row add-receiver-title mr-0 ml-0 pl-5 pr-5">
                    <h2>Add new receiver</h2> 
                </div>
                <div className="row add-receiver-form mr-0 ml-0 pl-5 pr-5">
                    <div className="col-4">
                    <InputMask {...this.props} mask="999-999-999-999" maskChar="-" 
                        onChange={this.handleOnchangeAccountNumber}
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
                    <div className="col-4">
                        <TextField
                            id="outlined-email-input"
                            label="Remider name"
                            className={classes.textField}
                            type="text"
                            name="Name"                            
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            value={this.state.remiderName}
                            onChange={this.handleChangeRemiderName}
                        />
                    </div> 
                    <div className="col-4 d-flex justify-content-center align-items-center">
                        <button className="btn btn-default btn-primary w-75" onClick={() => {this.handleAddReceiver()}}>Add</button>
                    </div>                   
                </div>                
            </div>
        )
    }
}

AddReceiver.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(AddReceiver)));

