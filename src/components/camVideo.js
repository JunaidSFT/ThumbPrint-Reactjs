import React from 'react';
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCircleStop, faCircleDown } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import './style.css';

const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
    facingMode: FACING_MODE_ENVIRONMENT
  };



const WebcamStreamCapture = () => {

   
  var ROI_W = 0.33
  var ROI_H = 0.35

const LEFT_SPACE = 0.3     // in percentage
const TOP_SPACE = 0.2      // in percentage

    
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const height = window.innerHeight;
    const width = window.innerWidth;

    console.log(height, width)

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `/result` ; 
      navigate(path);
        
    }
  
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

  
      
    }, [webcamRef, setCapturing, mediaRecorderRef]
    
    );

    function openInNewTab(url) {
      var win = window.open("https://www.google.com", '_blank');
      win.focus();
    }

    function setIntervalX(callback, delay, repetitions) {
      var x = 0;
      var intervalID = window.setInterval(function () {
  
         callback();
  
         if (++x === repetitions) {
             window.clearInterval(intervalID);
         }
      }, delay);
  }

    const ImageCapture = React.useCallback( () => {
      setLoading(true);
      
         const arr = [];
         var time = 0; 
        setIntervalX(function () {
          
          const imageSrc = webcamRef.current.getScreenshot();
          time = time +1;
          console.log('image', imageSrc);
          arr.push(imageSrc);
          console.log("arr", arr)

          if (time === 5 ){
            
            
            axios({
              method: "POST",
              url: "/api/post/finger",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                
              },
              data: {
                dims: [width, height, LEFT_SPACE, TOP_SPACE, ROI_W, ROI_H],
                base64: arr[2]
              },
            })
              .then((response) => {
                
                console.log(response);
                localStorage.setItem("resultData", response.data);
              routeChange()
                
              })
              .catch((error) => {
                console.log(error);
                

              });
              setLoading(false);
             
              
          }
          
      }, 1000, 5);  
      
          
      },
      [webcamRef]
    );

    const limtedVideo = () => {
      handleStartCaptureClick();
      setTimeout(() => {
        handleStopCaptureClick()
        console.log('recording stopped..')
        
    
    }, 7000)
    }
  
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
        screenshotFormat="image/jpeg"
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
          <div>
            
          <div className="webcamCapture">
          {loading ? <div style = {{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>  
          <ReactLoading width={100} type={"spinningBubbles"} color="#0083ca" />
          </div>: <div className="webcamCapture_button">
            <FontAwesomeIcon icon={faCirclePlay} onClick={ImageCapture} size="3x" />
          </div>
            }
          <div className="rectangle" style = {{height: height * ROI_H, width: width * ROI_W, marginLeft: `${LEFT_SPACE*100}%`, marginTop:`${TOP_SPACE*100}%` }}>
            
        </div>
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