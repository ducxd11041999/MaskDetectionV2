import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core';
import styles from './Style'
class FormDialog extends Component {

    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            open: false,
            id: '',
            name: '',
            ages: 0,
            heath: '',
            gender: false
        };
    }
    onClearData = () =>{
        this.setState = {
            open: false,
            id: '',
            name: '',
            ages: 0,
            heath: '',
            gender: false
        };
        this.handleClose();
    }
    handleClose = () => {
        this.props.onCloseForm();
    };
    onChange =(event)=>
    {
        var target = event.target
        var name = target.name
        var value = target.value
        if (name ==='status')
        {
            value = (value === "true" ? true : false);
        }
        this.setState(
            {
                [name]:value
            })
    }
    onSubmit = (event) =>{
        //console.log("submit")
        event.preventDefault();
        this.props.onInformation(this.state)
        this.handleClose();
    }
    render(){
        const {openForm, classes} = this.props
    return (
        <div>
            <Dialog open={openForm} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
                <form onSubmit = {this.onSubmit} >
                    <DialogTitle id="form-dialog-title" className={classes.formSize} >
                        Thông tin cá nhân
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className = {classes.content}>
                            Vui lòng điền thông tin cá nhân của bạn
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Họ Tên"
                            type="text"
                            value = {this.state.name}
                            fullWidth
                            onChange = {this.onChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="ages"
                            label="Tuổi"
                            type="number"
                            value = {this.state.ages}
                            onChange = {this.onChange}
                            fullWidth
                        />
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.onChange}>
                            <FormControlLabel value= {false} checked ={this.state.gender === "false"}  control={<Radio />} label="Female" />
                            <FormControlLabel value={true} checked ={this.state.gender === "true"} control={<Radio />} label="Male" />
                        </RadioGroup>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="heath"
                            label="Tình trạng sức khỏe"
                            type="text"
                            value = {this.state.heath}
                            onChange = {this.onChange}
                            fullWidth
                        />
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button type="reset" onClick={this.onClearData} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="secondary">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
    }
}
export default withStyles(styles)(FormDialog)