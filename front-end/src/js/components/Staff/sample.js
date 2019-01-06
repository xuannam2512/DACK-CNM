import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

// const styles = {
//   card: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// };

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
  },tilechart1:
  {
     float: 'left',
     padding: 15,
     marginTop: -20,
     marginRight: 15,
     borderRadius: 3,
  }
});




function MediaCard(props) {
  const { classes } = props;
  return (
    <Grid container className={ classNames(classes.root,'mt-5')  } spacing={24}>
      <Grid item xs={3} >
        <Card className={classes.card}>
        <Card  className={classNames(' bg-danger',classes.tilechart1)} style={{ width:86 , height:86}}>
          <div style={{ width:56 , height :56 }} className={classNames(' d-flex justify-content-center align-self-center')}>
          <i style={{ color: '#303F9F' }} className="fa fa-user fa-2x pt-3 float-left" aria-hidden="true"></i>
          </div>
          </Card>
            <CardContent className={classNames('d-flex align-items-end flex-column')}>
              <Typography component="p" style={{fontSize:'14px'}}>
              USER ID
              </Typography>
              <Typography component="h3"  style={{fontSize:'35px'}}>
              49/50 
              </Typography>
            </CardContent>
            <Divider variant="inset" style={{margin:'0 10px'}} />
            <CardContent className={classNames('d-flex')}>
            <div className={classNames('d-flex justify-content-start align-items-center' )}>
            <i style={{ color: '#303F9F' , width:16 , height:16 }} className="fa fa-tag" aria-hidden="true"></i>
              <Typography component="p" style={{fontSize:'14px'}}>
                  USER ID
              </Typography>
            </div>
            </CardContent>
        </Card>
      </Grid>
    </Grid>
   
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
