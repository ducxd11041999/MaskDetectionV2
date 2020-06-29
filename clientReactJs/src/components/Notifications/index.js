import React, {Component} from 'react';
import AlertDialogSlide from './../Dialog/index';
//import Button from '@material-ui/core/Button';
class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            log:[{
                id: 1,
                title: " Cảnh báo ",
                content : "Bạn vui lòng đeo khẩu trang trước khi vào cửa"
            },{
                id: 2,
                title: " Thông báo ",
                content : "Hệ thống nhận diện bạn đã có khẩu trang vui lòng thực hiện bước tiếp theo"
            }
        ]
        }
    } 
    handleClose = (params) => {
        this.props.onClickNext(true)
    };  
    showLog = (logs, type) =>{
        var result;
        result = logs.map((log, index) =>{
            if(log.id === type)
                {
                    return (
                        <AlertDialogSlide key = {index}
                        open = {this.props.openLog} 
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
    UNSAFE_componentWillReceiveProps = (props) =>{
        if(props){
            if(props.mask){
                this.setState({
                    id : 2,
                })
            }else{
                this.setState({
                    id : 1,
                })
            }
        }
    }
    render (){
        var {log, id} = this.state
        return (
            <div>
                {this.showLog(log, id)}
            </div>
        );
    }
}

export default Notification