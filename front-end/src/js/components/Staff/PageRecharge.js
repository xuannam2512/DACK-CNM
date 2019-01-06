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
        marginTop: '100px'
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

const suggestions = [
    { label: 'XuanNam' },
    { label: 'Hai' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (

        <TextField
            InputProps={{
                inputRef: ref,
                ...InputProps,
            }}
            id="standard-password-input"
            label="User Name"
            className={classNames(classes.textField,'float-left') }
            margin="normal"
            fullWidth
            style={{ margin: 8}}
        />
    );
}
function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
        // style={{
        //   fontWeight: isSelected ? 500 : 400,
        // }}
        >
            {suggestion.label}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};
function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }
            return keep;
        });
}
// END TEXTCOMPLATE

const mapStateToProps = state => {
    return {
        xuser: state.xuser,
        xfullname: state.xfullname,
        xphone: state.xphone,
        xmail: state.xmail,
        xpassword: state.xpassword
    };
};


class PageRecharge extends Component {
    constructor() {
        super();
        this.state = {
            xstatusMoney:'money50',
        }
    }
   
    // handleChangeNameStatusMoney = name => event => {
    //     console.log('####################################################################');
    //     console.log('what event.target ::: ' + event.target.value);
        
    //     this.setState({ [name]: event.target.value });
    // };
   handleChangeNameStatusMoney = (name,value)  =>{
        console.log('####################################################################');
        console.log('what event.target ::: ' + name  +' || '+ value);
        
        this.setState({ [name]: value });
    };


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
                                                        {renderInput({
                                                            classes,
                                                            InputProps: getInputProps({
                                                                placeholder: 'Search full name',
                                                            }),
                                                        })}
                                                        <div {...getMenuProps()}>
                                                            {isOpen ? (
                                                                <Paper className={classes.xpaper} square>
                                                                    {getSuggestions(inputValue).map((suggestion, index) =>
                                                                        renderSuggestion({
                                                                            suggestion,
                                                                            index,
                                                                            itemProps: getItemProps({ item: suggestion.label }),
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
                                                value={this.props.xmail}
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
                                                value={this.props.xphone}
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
                                                value={this.state.permission}
                                                onChange={this.handleChange('permission')}
                                                input={<Input name="permission" id="age-native-helper" />}
                                            >
                                                <option value="" />
                                                <option value={10}>123-133-213-1323</option>
                                                <option value={20}>244-244-2444-2444</option>
                                                <option value={30}>500-500-500-0555</option>
                                            </NativeSelect>
                                        </FormControl>
                                        </div>
                                    </div>
                                    </Grid>
                                    <Grid item xs>
                                    <Typography align="center" variant="h5" style={{marginBottom: 20}}>
                                        ___[Số tiền nạp]___
                                    </Typography>
                                    <Grid container spacing={24}>
                                            <Grid item xs>
                                                <Chip
                                                    label="50.000 VNĐ"
                                                    onChange={this.handleChangeNameStatusMoney}
                                                    className={classes.chip}
                                                    onClick={() => { this.handleChangeNameStatusMoney('xstatusMoney','money50') }}
                                                    clickable
                                                    value = '50000'
                                                    color={this.state.xstatusMoney === 'money50' ? 'secondary': 'primary'}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Chip
                                                    label="100.000 VNĐ"
                                                    className={classes.chip}
                                                    onClick={() => { this.handleChangeNameStatusMoney('xstatusMoney','money100') }}
                                                    clickable
                                                    value = '100000'
                                                    color={this.state.xstatusMoney === 'money100' ? 'secondary': 'primary'}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Chip
                                                    label="200.000 VNĐ"
                                                    className={classes.chip}
                                                    onClick={() => { this.handleChangeNameStatusMoney('xstatusMoney','money200') }}
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
                                                    onClick={() => { this.handleChangeNameStatusMoney('xstatusMoney','money500') }}
                                                    clickable
                                                    value = '500000'
                                                    color={this.state.xstatusMoney === 'money500' ? 'secondary': 'primary'}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <Chip
                                                    label="Custom Pay in"
                                                    className={classes.chip}
                                                    onClick={() => { this.handleChangeNameStatusMoney('xstatusMoney','moneycustom') }}
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
                                            label="Custom Money"
                                            className={classes.textField}
                                            // autoComplete="current-password group float-left ml-2"
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
                                                onClick={()=>{ this.props.enqueueSnackbar('PayIn completely !!!') }}
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

export default connect(mapStateToProps)(withStyles(styles)(withSnackbar(PageRecharge)));
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
