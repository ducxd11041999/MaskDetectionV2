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
import { withStyles } from '@material-ui/core';
import styles from './Style'

class FormDialog extends Component {

    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            open: false,
            name: '',
            ages: '',
            heath: '',
            gender: false
        };
    }
    onClearData = () =>{
        this.setState ({
            open: false,
            name: '',
            ages: '0',
            heath: '',
            gender: false
        });
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
        this.onClearData();
    }
    render(){
        const {openForm, classes} = this.props
    return (
        <div>
            <Dialog open={openForm} onClose={this.handleClose}  
            aria-labelledby="form-dialog-title" 
            fullWidth = {true}
            className = {classes.root}>
                <form className={classes.root} autoComplete="off">
                    <DialogTitle id="form-dialog-title" >
                        <div className={classes.formSize}>
                            Thông tin cá nhân
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className = {classes.formContentSize}>
                            Vui lòng điền thông tin cá nhân của bạn
                        </DialogContentText>
                                <TextField
                                    variant = "filled"
                                    autoFocus
                                    margin="dense"
                                    name="name"
                                    label="Họ & Tên"
                                    type="text"
                                    value = {this.state.name}
                                    fullWidth = {true}
                                    onChange = {this.onChange}
                                    inputProps={{
                                        style: {fontSize: "15px"} 
                                    }}
                                    InputLabelProps={{style: {fontSize: "15px"}}} // font size of input label
                                    required
                                />
                                <TextField
                                    variant = "filled"
                                    autoFocus
                                    margin="dense"
                                    name="ages"
                                    type="text"
                                    label ="Tuổi"
                                    value = {this.state.ages}
                                    onChange = {this.onChange}
                                    inputProps={{
                                        style: {fontSize: "15px"} 
                                    }}
                                    InputLabelProps={{style: {fontSize: "15px"}}} // font size of input label
                                    fullWidth
                                    required
                                />
                        <RadioGroup aria-label="gender" 
                            name="gender" value={this.state.gender}
                            onChange={this.onChange} required
                            className = {classes.pl10}
                        >
                            <FormControlLabel value= "false" 
                            checked ={this.state.gender === "false"} 
                                control={<Radio />} 
                                label={<span style={{ fontSize: '15px' }}>Nữ</span>}
                            />
                            <FormControlLabel value="true" 
                                checked ={this.state.gender === "true"} control={<Radio />} 
                                label={<span style={{ fontSize: '15px' }}>Nữ</span>} 
                            />
                        </RadioGroup>
                        <TextField
                            autoFocus
                            variant = "filled"
                            margin="dense"
                            name="heath"
                            label="Tình trạng sức khỏe"
                            type="text"
                            inputProps={{
                                style: {fontSize: "15px"} 
                            }}
                            InputLabelProps={{style: {fontSize: "15px"}}} // font size of input label
                            value = {this.state.heath}
                            onChange = {this.onChange}
                            fullWidth
                            required
                            className = {classes.txtFileSize}
                        />
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant = "contained" type="reset" onClick={this.onClearData} color="primary">
                            Cancel
                        </Button>
                        <Button variant = "contained" type="submit" color="secondary"  onClick={e => this.onSubmit(e)}>
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