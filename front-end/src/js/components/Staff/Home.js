import React, { Component } from 'react'
//import { BrowserRouter as Router, Route, Link, withRouter, Redirect } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
    emailsSubscriptionChart,
    completedTasksChart
} from "../../store/charts";

//import css
import '../../../css/Home.css'
import '../../../../node_modules/chartist/dist/chartist.min.css';


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  });
  

class Home extends Component {
    // constructor(props) {        
    //     super(props);
    // }
    render() {                         
        const { classes } = this.props;
        return (
           <div className='container'>
           {/* START content 1 */}
            <Grid container className={ classNames(classes.root,'mt-5')  } spacing={24}>
                <Grid item xs={3} className={classNames('position-relative')}>
                    <Card className={classes.card}>
                            <CardContent className={classNames('d-flex align-items-end flex-column')}>
                            <Typography component="p" style={{fontSize:'14px'}}>
                            User ID
                            </Typography>
                            <Typography component="h3"  style={{fontSize:'35px'}}>
                            49/50 
                            </Typography>
                            </CardContent>
                        <Divider variant="inset" style={{margin:'0 10px'}} />
                            <CardContent className={classNames('d-flex')}>
                            <div className={classNames('d-flex justify-content-start align-items-center' )}>
                            <i style={{ color: '#303F9F' , width:16 , height:16 }} className="fa fa-warning" aria-hidden="true"></i>
                            <Typography component="p" style={{fontSize:'14px'}}>
                                Home
                            </Typography>
                            </div>
                            </CardContent>
                        <Card  className={classNames('position-absolute d-flex justify-content-center align-self-center')} style={{backgroundColor:'#fc9309',left:30 , top:-8 , width:86 , height:86}}>
                            <i style={{ color: '#fff' }} className="fa fa-users fa-3x d-flex justify-content-center align-self-center" aria-hidden="true"></i>
                        </Card>
                    </Card>
                </Grid>
                <Grid item xs={3} className={classNames('position-relative')}>
                    <Card className={classes.card}>
                            <CardContent className={classNames('d-flex align-items-end flex-column')}>
                            <Typography component="p" style={{fontSize:'14px'}}>
                            Revenue
                            </Typography>
                            <Typography component="h3"  style={{fontSize:'35px'}}>
                            $3,425
                            </Typography>
                            </CardContent>
                        <Divider variant="inset" style={{margin:'0 10px'}} />
                            <CardContent className={classNames('d-flex')}>
                            <div className={classNames('d-flex justify-content-start align-items-center' )}>
                            <i style={{ color: '#303F9F' , width:16 , height:16 }} className="fa fa-tags" aria-hidden="true"></i>
                            <Typography component="p" style={{fontSize:'14px'}}>
                                CardContent
                            </Typography>
                            </div>
                            </CardContent>
                        <Card  className={classNames('position-absolute d-flex justify-content-center align-self-center')} style={{backgroundColor:'#5ab25e',left:30 , top:-8 , width:86 , height:86}}>
                            <i style={{ color: '#fff' }} className="fa fa-home fa-3x d-flex justify-content-center align-self-center" aria-hidden="true"></i>
                        </Card>
                    </Card>
                </Grid>
                <Grid item xs={3} className={classNames('position-relative')}>
                    <Card className={classes.card}>
                            <CardContent className={classNames('d-flex align-items-end flex-column')}>
                            <Typography component="p" style={{fontSize:'14px'}}>
                            Fixed Issues
                            </Typography>
                            <Typography component="h3"  style={{fontSize:'35px'}}>
                            75
                            </Typography>
                            </CardContent>
                        <Divider variant="inset" style={{margin:'0 10px'}} />
                            <CardContent className={classNames('d-flex')}>
                            <div className={classNames('d-flex justify-content-start align-items-center' )}>
                            <i style={{ color: '#303F9F' , width:16 , height:16 }} className="fa fa-shield" aria-hidden="true"></i>
                            <Typography component="p" style={{fontSize:'14px'}}>
                                Print page
                            </Typography>
                            </div>
                            </CardContent>
                        <Card  className={classNames('position-absolute d-flex justify-content-center align-self-center')} style={{backgroundColor:'#ed4f4c',left:30 , top:-8 , width:86 , height:86}}>
                            <i style={{ color: '#fff' }} className="fa fa-steam fa-3x d-flex justify-content-center align-self-center" aria-hidden="true"></i>
                        </Card>
                    </Card>
                </Grid>
                <Grid item xs={3} className={classNames('position-relative')}>
                    <Card className={classes.card}>
                            <CardContent className={classNames('d-flex align-items-end flex-column')}>
                            <Typography component="p" style={{fontSize:'14px'}}>
                            Followers
                            </Typography>
                            <Typography component="h3"  style={{fontSize:'35px'}}>
                            +1997
                            </Typography>
                            </CardContent>
                        <Divider variant="inset" style={{margin:'0 10px'}} />
                            <CardContent className={classNames('d-flex')}>
                            <div className={classNames('d-flex justify-content-start align-items-center' )}>
                            <i style={{ color: '#303F9F' , width:16 , height:16 }} className="fa fa-tag" aria-hidden="true"></i>
                            <Typography component="p" style={{fontSize:'14px'}}>
                                Clever
                            </Typography>
                            </div>
                            </CardContent>
                        <Card  className={classNames('position-absolute d-flex justify-content-center align-self-center')} style={{ backgroundColor:'#18bdd1', left:30 , top:-8 , width:86 , height:86}}>
                            <i style={{ color: '#fff' }} className="fa fa-blind fa-3x d-flex justify-content-center align-self-center" aria-hidden="true"></i>
                        </Card>
                    </Card>
                </Grid>
            </Grid>
           {/* END content 1 */}
            {/* START content 2 */}
            <Grid container className={ classNames(classes.root,'mt-5')  } spacing={24}>
                <Grid item xs={4} className={classNames('position-relative')}>
                    <Card className={classes.card}>
                            <div style={{height:140}}></div>
                            <CardContent className={classNames('d-flex align-items-start flex-column')}>
                            <Typography component="p" style={{fontSize:'14px'}}>
                            Fixed Issues
                            </Typography>
                            <Typography component="h3"  style={{fontSize:'35px'}}>
                            75
                            </Typography>
                            </CardContent>
                        <Divider variant="inset" style={{margin:'0 10px'}} />
                            <CardContent className={classNames('d-flex')}>
                            <div className={classNames('d-flex justify-content-start align-items-center' )}>
                            <i style={{ color: '#303F9F' , width:16 , height:16 }} className="fa fa-warning" aria-hidden="true"></i>
                            <Typography component="p" style={{fontSize:'14px'}}>
                                Hopefully
                            </Typography>
                            </div>
                            </CardContent>
                        <Card  className={classNames('position-absolute d-flex justify-content-center align-self-center')} style={{backgroundColor:'#fc9309',left:33 , top:-8 }}>
                            <ChartistGraph
                                className="ct-chart"
                                data={emailsSubscriptionChart.data}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                listener={emailsSubscriptionChart.animation}
                            />
                        </Card>
                    </Card>
                </Grid>
                <Grid item xs={4} className={classNames('position-relative')}>
                    <Card className={classes.card}>
                            <div style={{height:140}}></div>
                            <CardContent className={classNames('d-flex align-items-start flex-column')}>
                            <Typography component="p" style={{fontSize:'14px'}}>
                            Revenue
                            </Typography>
                            <Typography component="h3"  style={{fontSize:'35px'}}>
                            $34,245
                            </Typography>
                            </CardContent>
                        <Divider variant="inset" style={{margin:'0 10px'}} />
                            <CardContent className={classNames('d-flex')}>
                            <div className={classNames('d-flex justify-content-start align-items-center' )}>
                            <i style={{ color: '#303F9F' , width:16 , height:16 }} className="fa fa-tag" aria-hidden="true"></i>
                            <Typography component="p" style={{fontSize:'14px'}}>
                                Success
                            </Typography>
                            </div>
                            </CardContent>
                        <Card  className={classNames('position-absolute d-flex justify-content-center align-self-center')} style={{backgroundColor:'#5ab25e',left:33 , top:-8 }}>
                                <ChartistGraph
                                className="ct-chart"
                                data={completedTasksChart.data}
                                type="Line"
                                options={completedTasksChart.options}
                                listener={completedTasksChart.animation}
                                />
                        </Card>
                    </Card>
                </Grid>
                <Grid item xs={4} className={classNames('position-relative')}>
                    <Card className={classes.card}>
                        <div style={{height:140}}></div>
                            <CardContent className={classNames('d-flex align-items-start flex-column')}>
                            <Typography component="p" style={{fontSize:'14px'}}>
                            Fixed Issues
                            </Typography>
                            <Typography component="h3"  style={{fontSize:'35px'}}>
                            90
                            </Typography>
                            </CardContent>
                        <Divider variant="inset" style={{margin:'0 10px'}} />
                            <CardContent className={classNames('d-flex')}>
                            <div className={classNames('d-flex justify-content-start align-items-center' )}>
                            <i style={{ color: '#303F9F' , width:16 , height:16 }} className="fa fa-circle" aria-hidden="true"></i>
                            <Typography component="p" style={{fontSize:'14px'}}>
                                Scholarship
                            </Typography>
                            </div>
                            </CardContent>
                        <Card  className={classNames('position-absolute d-flex justify-content-center align-self-center')} style={{backgroundColor:'#ed4f4c',left:33 , top:-8 }}>
                                <ChartistGraph
                                className="ct-chart"
                                data={emailsSubscriptionChart.data}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                listener={emailsSubscriptionChart.animation}
                            />
                        </Card>
                    </Card>
                </Grid>
            </Grid>
           {/* END content 2 */}
           </div>
        )
    }
}

export default withStyles(styles)(Home);