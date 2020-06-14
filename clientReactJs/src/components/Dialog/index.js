import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import WarningIcon from '@material-ui/icons/Warning'
import { withStyles } from '@material-ui/core';
import styles from './Style'
 class AlertDialogSlide extends Component {
  Transition = React.forwardRef(function Transition(props, ref){
    return <Slide direction="left" ref={ref} {...props} />;
  });
  handleClickOpen = () => {
    this.setState({
      open : true
    })
  };
  handleClose = (params) => {
      this.props.handleClose(params);
  };
  render(){
    var {open, log, classes} = this.props;

    //console.log(open)
  return (
    <div >
        <Dialog
          open={open}
          TransitionComponent={this.Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title" color = 'secondary' className = {classes.box}><WarningIcon /> {log.title} </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                {log.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose(false)} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button onClick={ () => this.handleClose(true)}  variant="contained" color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    );
  }
}

export default withStyles(styles)(AlertDialogSlide)