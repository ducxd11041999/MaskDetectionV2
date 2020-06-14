import React, {Component} from 'react';
import { Player } from 'video-react';
import "./../../../node_modules/video-react/dist/video-react.css"; // import css
//import Button from '@material-ui/core/Button';
import styles from './Style'
import { withStyles } from '@material-ui/core';
class Stream extends Component{
  render(){
      return (
            <div>
                <h1> Video </h1>
                <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    />
            </div>
        );
    }
}
export default withStyles(styles)(Stream);
