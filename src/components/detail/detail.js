import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './style.scss';



const Detail = () => {
    const [name, setName] = useState(null);
    const [cnic, setCNIC] = useState(null);

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        if (name == null && cnic == null){
            alert("These fields can't be empty")
        }
        else {
      let path = `/hand`; 
      navigate(path);
        }
    }

    function handleChangeName(event) {
        setName(event.target.value)
        console.log(name);
      }

      function handleChangeCnic(event) {
        setCNIC(event.target.value)
        console.log(cnic);
      }
    
  return (
    <div>
  <div className="wrapper">
  <div className="container">
    <h1>Enter your Details</h1>
    <form className="form">
      <input type="text" placeholder="Username" onChange={handleChangeName} required/>
      <input type="text" placeholder="CNIC (without Dashes)" onChange={handleChangeCnic} required/>
      <input type="text" placeholder="Phone Number" required/>
      <button type="submit" id="login-button" onClick={routeChange}>Next</button>
    </form>
  </div>
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
  );
};

export default Detail;
