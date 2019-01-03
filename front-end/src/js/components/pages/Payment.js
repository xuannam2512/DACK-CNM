import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
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
    return ['Account sender', 'Account receiver', 'Verify', 'Complete'];
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

    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className="container-fluid mr-0 ml-0">
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
                <div className="row">
                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </div>               
            </div>
        )
    }
}

Payment.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Payment);