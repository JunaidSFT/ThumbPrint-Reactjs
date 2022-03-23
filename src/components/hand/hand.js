import React, {useState} from 'react';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";


import right_hand from './../../assets/right_hand.png';
import left_hand from './../../assets/left_hand.png';

import './style.css';


const options = [
    { value: 'thumb', label: 'thumb' },
    { value: 'index finger', label: 'index finger', color: 'black' },
    { value: 'middle finger', label: 'middle finger' },
    { value: 'ring finger', label: 'ring finger' },
    { value: 'pinky finger', label: 'pinky finger' },
  ];

  const customStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: 'black',
      backgroundColor: isFocused ? "#53e3a6" : null,
    }),
    // control: provider => ({
    //     ...provider,
    //     width: 200,
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    //   }),
  }

const Hand = () => {
    const [hand, setHand] = useState(null);
    const [finger, setFinger] = useState(null);


    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        if (hand == null && finger == null){
            alert("Please Select these fields")
        }
        else {
      let path = `/webcam`; 
      navigate(path);
        }
    }

  return (
    <div>
        <div className="wrapper">
            <div className="container">
            
            <p className="header">Select a hand and finger</p>  

            <div className= 'row' style = {{ justifyContent: 'center',alignItems: 'center'}}>
                <div style = {{padding: '10px'}}>
                    <div 
                        className ="clickableHand"
                        style={{border: hand==='left' ? '2px solid blue' : '2px solid black'}}
                        onClick={() => setHand("left")}
                    >
                        <img src={left_hand} className="image" alt= "left-hand"/>  
                    </div>
                    <p className="handText">Left Hand</p>
                </div>

                <div style={{marginHorizontal: 10}}></div>

                <div>
                    <div 
                        className = "clickableHand"
                        style={{border: hand==='right' ? '2px solid blue' : '2px solid black'}} 
                        onClick={() => setHand("right")}
                    >
                        <img src={right_hand} className = "image" alt= "right-hand"/>  
                    </div>
                    <p className="handText">Right Hand</p>
                </div>
            </div>

                <div>
                <Select
                    styles = {customStyles}
                    defaultValue={finger}
                    onChange={setFinger}
                    options={options}
                />
                </div>

                
                <button className = "next-button" type="submit" id="login-button" onClick={routeChange}>Next</button>
                
            </div>
            <div>
            <ul className="bg-bubbles">
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                </ul>
                </div>
            </div>
    </div>
  )
}

export default Hand