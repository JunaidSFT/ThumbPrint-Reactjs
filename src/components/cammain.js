import React, {useEffect, useState, useRef} from "react";
import Webcam from "react-webcam";
//  var cv = require('opencv.js');


const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
    facingMode: FACING_MODE_USER
  };
  
  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);
    const [seconds, setSeconds] = useState(0);
    const canvasRef = useRef();
    // const webcamRef = useRef();
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    const handleClick = React.useCallback(() => {
        setFacingMode(
          prevState =>
            prevState === FACING_MODE_USER
              ? FACING_MODE_ENVIRONMENT
              : FACING_MODE_USER
        );
      }, []);



      useEffect(() => {
        const timer = setTimeout(() => {
            setSeconds(seconds => seconds + 1);
        }, 3000, 5);
        return () => clearTimeout(timer);
      }, []);

      const newCapture = () => {
        const v = webcamRef.current;
        const duration = v.duration;
        const totalSecond = parseInt(duration, 10);
        Array(totalSecond + 1)
          .fill(null)
          .forEach((_, index) => {
            setTimeout(() => {
              v.currentTime = index;
              canvasRef.current.width = webcamRef.current.videoWidth;
              canvasRef.current.height = webcamRef.current.videoHeight;
              canvasRef.current
                .getContext("2d")
                .drawImage(
                  webcamRef.current,
                  0,
                  0,
                  webcamRef.current.videoWidth,
                  webcamRef.current.videoHeight
                );
              const newCanvas = document.createElement("canvas");
              const newCtx = newCanvas.getContext("2d");
              newCtx.drawImage(
                webcamRef.current,
                0,
                0,
                webcamRef.current.videoWidth,
                webcamRef.current.videoHeight
              );
              //console.log("dataUrl", newCanvas.toDataURL());
            }, index * 1000);
          });
    
        // canvasRef.current.toBlob((blob) => {
        //   const img = new Image();
        //   img.setAttribute('crossorigin', 'anonymous');
        //   img.src = window.URL.createObjectUrl(blob);
        // })
      };
  
    return (
      <>
      <button onClick={handleClick}>Switch camera</button>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            ...videoConstraints,
            facingMode
          }}
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img
            src={imgSrc}
            alt = "taken"
          />
        )}
        
        {seconds} seconds have elapsed since mounting.
        
      </>
    );
  };

  export default WebcamCapture;