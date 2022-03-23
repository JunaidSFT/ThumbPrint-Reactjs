import React from 'react';
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCircleStop, faCircleDown } from "@fortawesome/free-regular-svg-icons";

import './style.css';

const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
    facingMode: FACING_MODE_ENVIRONMENT
  };

const WebcamStreamCapture = () => {
   


    
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
  
    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
      setTimeout(() => {
        handleStopCaptureClick()
        console.log('recording stopped..')
        // setRecord(false)
    
    }, 5000)
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "react-webcam-stream-capture.webm";
        a.click();
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks]);
  
    return (
      <>
      <div id="video-stream">
        <Webcam 
        audio={false}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "50%",
          marginLeft: "-50%",
          objectFit: "cover",
          objectPosition: "center"
        }}
        />
        </div>
        {capturing ? (
          <div className="webcamCapture">
          <div className="webcamCapture_button">
            <FontAwesomeIcon icon={faCircleStop} onClick={handleStopCaptureClick} size="3x" />
          </div>
        </div>
          // <button onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <div className="webcamCapture">
          <div className="webcamCapture_button">
            <FontAwesomeIcon icon={faCirclePlay} onClick={handleStartCaptureClick} size="3x" />
          </div>
        </div>
          // <button onClick={handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedChunks.length > 0 && (
          <div className="webcamCapture">
          <div className="webcamCapturedown_button">
            <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} size="3x" />
          </div>
        </div>
          
        )}
      </>
    );
  };

  export default WebcamStreamCapture;