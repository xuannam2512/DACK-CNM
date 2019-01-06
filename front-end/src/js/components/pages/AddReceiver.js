import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom'

//import css
import '../../../css/AddReceiver.css'

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

    handleChangeRemiderName = (e) => {
        this.setState({
            remiderName: e.target.value
        })
    }

    handleAddReceiver = () => {
        alert("Add");
        this.props.history.push('/receiver');
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
                        <TextField
                            id="outlined-email-input"
                            label="Account Number"
                            className={classes.textField}
                            type="text"
                            name="accountnumber"                           
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            value={this.state.accountNumber}
                            onChange={this.handleOnchangeAccountNumber}
                        />
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

export default withRouter(withStyles(styles)(AddReceiver));

