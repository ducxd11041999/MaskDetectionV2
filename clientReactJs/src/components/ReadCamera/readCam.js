import Webcam from "react-webcam";
import React , {useEffect} from 'react'
import videoConstraints from './Setting'
import Button from '@material-ui/core/Button';
import callApi from './../../utils/Call_api'
const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    var json = (`{ "img": ${JSON.stringify(imageSrc)}}`);
    var body = JSON.parse(json)
    callApi('/json', 'POST', body).then(res => {
      console.log(res)
    })
  }, [webcamRef, imgSrc]);
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
          height={500}
          width={500}
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