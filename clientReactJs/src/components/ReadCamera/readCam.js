import Webcam from "react-webcam";
import React , {useEffect} from 'react'
import videoConstraints from './Setting'
import Button from '@material-ui/core/Button';
import callApi from './../../utils/Call_api'
import { Base64 } from 'js-base64';
const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(typeof Base64.encode(imageSrc))
    let body = JSON.parse(`{ "img": ${JSON.stringify(imageSrc)}}`);
    callApi('/json', 'POST', body).then(res => {
      console.log(res)
    })
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