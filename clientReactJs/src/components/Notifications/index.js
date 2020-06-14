import React, {Component} from 'react';
import AlertDialogSlide from './../Dialog/index';
import Button from '@material-ui/core/Button';
class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            open: false,
            log:[{
                id: 1,
                title: "Cảnh Báo",
                content : "Bạn vui lòng đeo khẩu trang trước khi vào cửa"
            },{
                id: 2,
                title: "Thông báo",
                content : "Hệ thống nhận diện bạn đã có khẩu trang vui lòng thực hiện bước tiếp theo"
        }
        ],
            userClick: ''
        }
    } 
    showNotifications = () =>{
        //console.log("ok");
        this.setState({
            open: true,
            id : 2
        })
    }
    showWarning = () =>{
        //console.log("ok");
        this.setState({
            open: true,
            id : 1
        })
    }
    handleClose = (params) => {
        this.setState({
            open: false,
            userClick: params
        })
        console.log(params)
    };  
    showLog = (logs, type) =>{
        var result;
        result = logs.map((log, index) =>{
            if(log.id === type)
                {
                    return (
                        <AlertDialogSlide key = {index} open = {this.state.open} 
                        handleClose = {this.handleClose}
                        log = {log}
                        />
                    )
                }
            else
                return '';
        })
        return result;
    }
    render (){
        var {log, id} = this.state
        return (
            <div>
              <Button variant="outlined" color="primary" onClick={this.showNotifications} >
                    Show Notifications
              </Button>
              <Button variant="outlined" color="secondary" onClick={this.showWarning} >
                    Show Warning
              </Button>
              {this.showLog(log, id)}
            </div>
        );
    }
}

export default Notification