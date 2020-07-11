import Spinner from 'react-spinner-material';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './Style'
class LoadingPage extends Component {
    render() {
        let {displayLoading, classes} = this.props
        return (
            <div className = {classes.config}>
                <Spinner radius={120} color={"#f50057"} stroke={10} visible={displayLoading} />
            </div>
            );
        }
}
export default withStyles(styles)(LoadingPage)