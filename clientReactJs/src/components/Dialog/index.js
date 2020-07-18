import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import WarningIcon from '@material-ui/icons/Warning'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { withStyles } from '@material-ui/core';
import styles from './Style'
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
class AlertDialogSlide extends Component {
  Transition = React.forwardRef(function Transition(props, ref){
    return <Slide direction="left" ref={ref} {...props} />;
  });

  handleClose = (params) => {
      this.props.handleClose(params);
  };
  showIcon = (id) =>{
    let {classes} = this.props
      if(id===2){
        return <NotificationsActiveIcon className = {classes.icon} />
      }else if(id === 1){
        //show warnning
        return <WarningIcon className = {classes.icon}/> 
      }
      else if(id === 4){
        return <SmsFailedIcon className = {classes.icon}/>
      }
      else{
          return <CheckCircleOutlineIcon className = {classes.icon}/>
      }
  }
  styleTitle = () =>{
    var {log, classes} = this.props;
    var className = ""
    if(log.id === 1){
      className = classes.warnning
    }
    else if((log.id === 2) || (log.id === 3))
    {
      className = classes.notification
    }
    else{
      className = classes.ejectDoor
    }
    return className
  }
  render(){
      var {open, log, classes, onCountDown} = this.props;
      //console.log(open)
      var className = this.styleTitle()
      var icon = this.showIcon(log.id)
  return (
    <div className = {classes.borderDialog}>
        <Dialog
          open={open}
          TransitionComponent={this.Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-slide-title" root ="MuiDialogTitle-root" color = 'secondary' className = {className} >
            <div className={classes.zoomTitle}>
              {icon}
              {log.title}
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.zoomContent} id="alert-dialog-slide-description" >
                  {log.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => this.handleClose(true)} className={classes.zoomButton} variant="contained" size = "large" color="secondary">
              OK ({onCountDown})
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    );
  }
}
export default withStyles(styles)(AlertDialogSlide)