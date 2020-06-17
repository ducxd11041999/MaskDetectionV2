import Webcam from "react-webcam";
import React , {useEffect} from 'react'
import videoConstraints from './Setting'
import Button from '@material-ui/core/Button';
import callApi from './../../utils/Call_api'
import { Base64 } from 'js-base64';
var fs = require('fs');
const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    //console.log(typeof Base64.encode(imageSrc, 'ascii'))
    //const cvt = (Base64.encodeURI(imageSrc));
    //console.log(cvt)
    var json = (`{ "img": ${JSON.stringify(imageSrc)}}`);
    var body = JSON.parse(json)
    callApi('/json', 'POST', body).then(res => {
      console.log(res)
    })
    // var data = imageSrc.replace(/^data:image\/\w+;base64,/, "");
    // var buf = new Buffer(data, 'base64');
    // fs.writeFile('image.png', buf, function(err){
    //     if(err){
    //       console.log(err)
    //     }
    // });
  }, [webcamRef]);
    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     console.log("captured");
    //     capture();
    //   }, 5000);
    //   return () => clearInterval(interval);
    // }, [capture]);
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          height={720}
          width={1280}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
        />

        <Button variant="contained" onClick={capture} color = 'secondary'>Capture photo</Button>
        {
          imgSrc && (
          <img alt = "System not display your face"
            src={imgSrc}
          />
        )
        }
      </>
    );
  };

  export default WebcamCapture;