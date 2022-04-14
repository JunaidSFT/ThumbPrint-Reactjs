import React from "react";
import { Routes, Route } from "react-router-dom";

// import { OpenCvProvider, useOpenCv } from "opencv-react";
// import WebcamStreamCapture from "./components/camVideo";
// import Example from "./components/example";
import Detail from "./components/detail/detail";
import Hand from './components/hand/hand.js';
import WebcamStreamCapture from "./components/camVideo";
import Result from "./result";

// function MyComponent() {
//   const { loaded, cv } = useOpenCv();
//   console.log("loaded >> ", loaded);
//   console.log("opencv details >> ", cv);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageStatus, setImageStatus] = useState(null);
//   const [grayScale, setGrayScale] = useState(true);
//   const [edge, setEdge] = useState(true);
//   const [rotate, setRotate] = useState(true);
//   const [erosion, setErosion] = useState(true);
//   const [dilation, setDialation] = useState(true);

//   const onImageChange = (e) => {
//     console.log("e >> ", e.target.files[0]);
//     let imgElement = document.getElementById("imageSrc");
//     imgElement.src = URL.createObjectURL(e.target.files[0]);
//     setImageStatus(imgElement);
//     //imgElement.onload = function () {
//     //};
//   };

//   const onGrayScaleChange = () => {
//     setGrayScale(!grayScale);
//     if (grayScale) {
//       let src = cv.imread(imageStatus);
//       let dst = new cv.Mat();
//       // You can try more different parameters
//       cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
//       cv.imshow("canvasOutput", dst);
//       //setImageStatus(dst);
//       src.delete();
//       dst.delete();
//     }
//   };

//   const onEdgeChange = () => {
//     setEdge(!edge);
//     if (edge) {
//       let src = cv.imread(imageStatus);
//       let dst = new cv.Mat();
//       cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
//       // You can try more different parameters
//       cv.Canny(src, dst, 50, 100, 3, false);
//       cv.imshow("canvasOutput", dst);
//       src.delete();
//       dst.delete();
//     }
//   };

//   const onRotateChange = () => {
//     setRotate(!rotate);
//     if (rotate) {
//       let src = cv.imread(imageStatus);
//       let dst = new cv.Mat();
//       let dsize = new cv.Size(src.rows, src.cols);
//       let center = new cv.Point(src.cols / 2, src.rows / 2);
//       // You can try more different parameters
//       let M = cv.getRotationMatrix2D(center, 45, 1);
//       cv.warpAffine(
//         src,
//         dst,
//         M,
//         dsize,
//         cv.INTER_LINEAR,
//         cv.BORDER_CONSTANT,
//         new cv.Scalar()
//       );
//       cv.imshow("canvasOutput", dst);
//       src.delete();
//       dst.delete();
//       M.delete();
//     }
//   };

//   const onErosionChange = () => {
//     setErosion(!erosion);
//     if (erosion) {
//       let src = cv.imread(imageStatus);
//       let dst = new cv.Mat();
//       let M = cv.Mat.ones(5, 5, cv.CV_8U);
//       let anchor = new cv.Point(-1, -1);
//       // You can try more different parameters
//       cv.erode(
//         src,
//         dst,
//         M,
//         anchor,
//         1,
//         cv.BORDER_CONSTANT,
//         cv.morphologyDefaultBorderValue()
//       );
//       cv.imshow("canvasOutput", dst);
//       src.delete();
//       dst.delete();
//       M.delete();
//     }
//   };

//   const onDilationChange = () => {
//     setDialation(!dilation);
//     if (dilation) {
//       let src = cv.imread(imageStatus);
//       let dst = new cv.Mat();
//       let M = cv.Mat.ones(5, 5, cv.CV_8U);
//       let anchor = new cv.Point(-1, -1);
//       // You can try more different parameters
//       cv.dilate(
//         src,
//         dst,
//         M,
//         anchor,
//         1,
//         cv.BORDER_CONSTANT,
//         cv.morphologyDefaultBorderValue()
//       );
//       cv.imshow("canvasOutput", dst);
//       src.delete();
//       dst.delete();
//       M.delete();
//     }
//   };

// const testCv = () => {

//   let video = document.getElementById("videoInput"); // video is the id of video tag
//  video.width = 320;
// video.height = 240;
// navigator.mediaDevices
//   .getUserMedia({ video: true, audio: false })
//   .then(function(stream) {
//     video.srcObject = stream;
//     video.play();

    
//     let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
//     let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
//     let cap = new cv.VideoCapture(video);

//     const FPS = 30;
//     function processVideo() {
//       try {
//         // if (!streaming) {
//         //   // clean and stop.
//         //   src.delete();
//         //   dst.delete();
//         //   return;
//         // }
//         let begin = Date.now();
//         // start processing.
//         cap.read(src);
//         cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
//         cv.imshow("canvasOutput", dst);
//         // schedule the next one.
//         let delay = 1000 / FPS - (Date.now() - begin);
//         setTimeout(processVideo, delay);
//       } catch (err) {
//         console.error(err);
//       }
//     }

//        // schedule the first one.
//        setTimeout(processVideo, 0);
//       })
//       .catch(function(err) {
//         console.log("An error occurred! " + err);
//       });

//     }
  

  



//   if (loaded) {
//     return (
//       <>
//         <div className="inputoutput">
//           <div className="processing">
//             Apply Grayscale
//             <input
//               type="checkbox"
//               id="RGB2Gray"
//               name="RGB2Gray"
//               value="Grayscale Conversion"
//               onChange={onGrayScaleChange}
//             />
//             <br></br>
//             Detect Edges
//             <input
//               type="checkbox"
//               id="edgeDetection"
//               name="edgeDetection"
//               value="Edge Detection"
//               onChange={onEdgeChange}
//             />
//             <br></br>
//             Rotate Image
//             <input
//               type="checkbox"
//               id="rotateImage"
//               name="rotateImage"
//               value="Rotate Image"
//               onChange={onRotateChange}
//             />
//             <br></br>
//             Image Erosion
//             <input
//               type="checkbox"
//               id="erosion"
//               name="erosion"
//               value="Image Erosion"
//               onChange={onErosionChange}
//             />
//             <br></br>
//             Image Dilation
//             <input
//               type="checkbox"
//               id="dilation"
//               name="dilation"
//               value="Image Dilation"
//               onChange={onDilationChange}
//             />
//             <button>start</button>

//           </div>
//           <img id="imageSrc" alt="Not available" />
//           <div className="caption">
//             imageSrc{" "}
//             <input
//               type="file"
//               id="fileInput"
//               name="file"
//               onChange={(e) => onImageChange(e)}
//             />
//           </div>
//         </div>
//         <button onClick = {testCv}>start</button>
//         <div>
//     <table>
//     <tbody><tr>
//         <td>
//             <video id="videoInput" width="320" height="240" style = {{border: '1px solid black'}}></video>
//         </td>
//         <td>
//             <canvas id="canvasOutput" width="320" height="240" style = {{border: '1px solid black'}}></canvas>
//         </td>
//         <td></td>
//         <td></td>
//     </tr>
//     <tr>
//         <td>
//             <div className="caption">videoInput</div>
//         </td>
//         <td>
//             <div className="caption">canvasOutput</div>
//         </td>
//         <td></td>
//         <td></td>
//     </tr>
//     </tbody></table>
// </div>
//         {/* <WebcamStreamCapture CV={cv}/> */}
        
//       </>
//     );
//     // return <p>opencv loaded</p>;
//   } else {
//     return (
//       <div>
//         <h1>Testing Opencv-React Lib </h1>
//         {selectedImage && (
//           <div>
//             <img
//               alt="not fount"
//               width={"250px"}
//               src={URL.createObjectURL(selectedImage)}
//               id="img"
//             />
//             <br />
//             <button onClick={() => setSelectedImage(null)}>Remove</button>
//             <canvas id="output"></canvas>
//           </div>
//         )}
//         <br />

//         <br />
//         <input
//           type="file"
//           name="myImage"
//           onChange={(event) => {
//             console.log(event.target.files[0]);
//             setSelectedImage(event.target.files[0]);
//           }}
//         />
//       </div>
//     );
//   }
// }




const App = () => {
  // const onLoaded = (cv) => {
  //   console.log("opencv loaded, cv");
    
  // };


  return (
    // <OpenCvProvider onLoad={onLoaded} openCvPath="/opencv/opencv.js">
    //   <MyComponent />
    // </OpenCvProvider>
    
    <div>
  <Routes>
        <Route path="/" element={<Detail />} />
        <Route path="/hand" element={<Hand />} />
        <Route path="/webcam" element={<WebcamStreamCapture />} />
        <Route path="/result" element={<Result />} />
      </Routes>
</div>

  );
};

export default App;
