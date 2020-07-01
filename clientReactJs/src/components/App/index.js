import React, {Component} from 'react';
//import Button from '@material-ui/core/Button';
import styles from './Style'
import { withStyles } from '@material-ui/core';
import Notification from './../Notifications/index';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './../../commons/theme'
//import Stream from './../StreamVideo/index'
import ReadCamera from './../ReadCamera/index'
import FormDialog from './../FormInfor/index'
import callApi from './../../utils/Call_api'
class App extends Component{
  constructor(props) {
      super(props);
      this.wrapper = React.createRef();
      this.state = {
      mask: false,
      displayForm: false,
      openLog: true,
      isHeath_OK: true, //mặt định user có bệnh
      step : "0",
      logId: 0
    };
  }

  onCap = (param) =>{
    // recive status mask
    console.log("Bấm nút chụp")
    var par  = param === 'True'? true: false;
    if(par){
      this.setState({
        mask: par, /// update lai co khau trang khong
        openLog: true, // mo thong báo
        step: "1", // chuyển sang bước 1
        logId: 2 /// Log ra thông báo có khẩu trang
      })}
    else{
      this.setState({
        mask: par, /// update lai co khau trang khong
        openLog: true, /// mo thong bao
        step: "0", /// Chuyển về lại bước 0
        logId: 1 // log ra warning
    })}
    console.log("Update sau chụp", this.state.step)
  }
  onClear = () =>{
    this.setState({
      mask: false,
      displayForm: false,
      openLog: true,
      isHeath_OK: true,
      step : "0"
    }) 
  }
  onClickNext = (param) =>{
    // click Ok from dialog
      if(this.state.mask){
        console.log("click next va co mat na")
        if(param){
          console.log(this.state.step)
          if(this.state.step==="1"){
          this.setState({
            displayForm: true, // mo from
            openLog: false, // dong cac log lai
            step: "2" // chuyen sang buoc 2
          })}
          else if(this.state.step===3){
            this.setState({
              displayForm: false,
              openLog: true,
              step: "0"
            })
          }
          else{
            this.setState({
              displayForm: false,
              openLog: false,
              step: "0"
            })
          }
      }
    }else{ // truong hop khong nhận mask
      this.setState({
        displayForm: false,
        openLog: false,
        step: "0"
      })
    }
  }
  onInformation = (param) =>{
    // recive data from form
    console.log("Form được submit với nội dung sau" , param)
    if(param){
    callApi('/usr_info', 'POST', param).then(res => {
        console.log("Server Tra ve ket qua co ho k", res.data)
        var status = res.data === "True"?true:false;
        if(status){ // neu phat hien co benh
        this.setState({
            isHeath_OK: status,  /// chuyển status có bệnh không của user, True có , false không
            openLog: true,
            logId: 4,
            step: "3" /// chuyển sang bước 3
        })
      }else{
        this.setState({
          isHeath_OK: status,  /// chuyển status có bệnh không của user, True có , false không
          openLog: true,
          logId: 3,
          step: "3" /// chuyển sang bước 3
      })
      }
      })
    this.onCloseForm();
  }

  }
  onCloseForm = () =>{
    this.setState({
      displayForm: false
    })
  }
  render(){
    let {classes} = this.props
    return (
      <ThemeProvider theme = {theme}>
        <div className = {classes.noCroll} ref={this.wrapper}>
          <div>
            <Notification openLog = {this.state.openLog}
                onHeath = {this.state.isHeath_OK}
                onClickNext= {this.onClickNext} 
                onStep = {this.state.step}
                id = {this.state.logId}
            />
            <FormDialog onInformation = {this.onInformation} 
              openForm = {this.state.displayForm}
              onStep = {this.state.step}
              onCloseForm = {this.onCloseForm}/>
            <ReadCamera onCap = {this.onCap}/>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
export default withStyles(styles)(App);
