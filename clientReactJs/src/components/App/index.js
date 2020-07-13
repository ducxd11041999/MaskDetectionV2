import React, {Component} from 'react';
//import Button from '@material-ui/core/Button';
import styles from './Style'
import { withStyles } from '@material-ui/core';
import Notification from './../Notifications/index';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './../../commons/theme'
import LoadingPage from './../LoadingPage/index.js'
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
      logId: 0,
      isDisplayLoading: false,
      rp: false,
      imgResult: '',
      onBlock: false
    };
    this.onCap = this.onCap.bind(this)
  }
  onCap = (param) =>{
    // recive status mask
    this.setState({
      isDisplayLoading : true,
      onBlock: true
    })
    console.log("Bấm nút chụp", param)
    callApi('/json', 'POST', param).then(res => {
          console.log((res))
          let resultCheck =  res.data.result
          let imgResult = res.data.img
          this.checkMask(resultCheck, imgResult)
      })
  }
  checkMask = (resultCheck, imgResult) =>{
    if(resultCheck){
      this.setState({
        mask: resultCheck, /// update lai co khau trang khong
        openLog: true, // mo thong báo
        step: "1", // chuyển sang bước 1
        logId: 2, /// Log ra thông báo có khẩu trang
        isDisplayLoading: false,
        imgResult: imgResult
      })}
    else{
      this.setState({
        mask: resultCheck, /// update lai co khau trang khong
        openLog: true, /// mo thong bao
        step: "0", /// Chuyển về lại bước 0
        logId: 1, // log ra warning
        isDisplayLoading: false,
        imgResult: imgResult,
    })}
    console.log("Update sau chụp", this.state.step)
  }
  onClear = () =>{
    this.setState({
      mask: false,
      displayForm: false,
      openLog: true,
      isHeath_OK: true,
      step : "0",
      isDisplayLoading: false,
      imgResult: '',
      onBlock : false
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
              step: "0",
              imgResult: '',
              onBlock : false
            })
          }
          else{
            this.setState({
              displayForm: false,
              openLog: false,
              step: "0",
              imgResult: '',
              onBlock : false
            })
          }
      }
    }else{ // truong hop khong nhận mask
      this.setState({
        displayForm: false,
        openLog: false,
        step: "0",
        imgResult: '',
        onBlock : false
      })
    }
  }
  onInformation = (param) =>{
    // recive data from form
    //console.log("Form được submit với nội dung sau" , param)
    if(param){
    callApi('/usr_info', 'POST', param).then(res => {
        console.log("From server COVID_RESULT :", res.data)
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
      displayForm: false,
      step:"0",
      imgResult: '',
      onBlock : false
    })
  }
  displayLoadingPage = () =>{
    return(
        <LoadingPage displayLoading = {this.state.isDisplayLoading}/> 
    )
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
            <LoadingPage displayLoading = {this.state.isDisplayLoading}/> 
            <FormDialog onInformation = {this.onInformation} 
              openForm = {this.state.displayForm}
              onStep = {this.state.step}
              onCloseForm = {this.onCloseForm}/>
            <ReadCamera onCap = {this.onCap} 
                onStep={this.state.step} 
                onReplay = {this.state.rp} 
                onImageResult = {this.state.imgResult}
                onBlock = {this.state.onBlock}
            />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
export default withStyles(styles)(App);
