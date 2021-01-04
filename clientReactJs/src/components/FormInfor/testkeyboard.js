import React, {Component} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'simple-keyboard/build/css/index.css';

class Demo extends Component {

  onChange = (input) => {
    console.log("Input changed", input);
  }

  onKeyPress = (button) => {
    console.log("Button pressed", button);
  }

  render(){
    return (
      <Keyboard
        onChange={input =>
          this.onChange(input)}
          onKeyPress={button =>
          this.onKeyPress(button)}
      />
    );
  }
}

export default Demo;