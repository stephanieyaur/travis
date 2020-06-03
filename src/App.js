import React, { useState } from 'react';
import './App.css';
import {get_idocData} from './stub-idoc';
import return_eligibility from './check-eligibility';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { green, red } from '@material-ui/core/colors';
import { white } from 'color-name';

function App() {
  console.log(process.env.REACT_APP_API_URL);
  // const [idocNum, setIdocNum] = useState("");

  // Select icon based on return (innocent until proven guilty, unless they were already guilty..?)
  const [passed, setPassed] = useState([]);
  // Add the id to the array of passed items if it doesn't exist but if it does exist remove it
  const handleCriteriaChange = (id) => {
    let result =  passed.includes(id) ? passed.filter(test => test != id) : [...passed, id]
    setPassed(result)
   // change <CheckCircleIcon /> to <CloseRoundedIcon /> at "id"
}


  const { register, handleSubmit, errors } = useForm();

  // callback function for check eligibility.
  const [submitted, setSubmitted] = useState('');
  
  const onSubmit = data => {
    console.log(data);
    // setSubmitted('True');
    // handleCriteriaChange(101);
    // data.preventDefault();
    var idocNum = data["IDOC_Number"];
    console.log(get_idocData(idocNum));
    document.getElementById("jsonData").innerHTML = JSON.stringify(get_idocData(idocNum))
    //check eligibility
    var eligibility = return_eligibility(idocNum)
    if (eligibility) {
      document.getElementById("eligibility").innerHTML = eligibility
    }
  };

  // const handleChange = (event) =>{
  //   setIdocNum(event.target.value);
  // }

  // const handleSubmit = (event) =>{
  //   event.preventDefault();
  //   console.log(get_idocData(idocNum));
  //   document.getElementById("jsonData").innerHTML = JSON.stringify(get_idocData(idocNum))
  //   //check eligibility
  //   var eligibility = return_eligibility(idocNum)
  //   if (eligibility) {
  //     document.getElementById("eligibility").innerHTML = eligibility
  //   }
  // }

  return (
    <div className="App">
      <div className="idocForm">
        <p>Use IDOC numbers: A00147, A00367, A01054</p>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* <form onSubmit={(event) => {
          event.preventDefault();
          console.log(get_idocData(idocNum));
          document.getElementById("jsonData").innerHTML = JSON.stringify(get_idocData(idocNum))
          //check eligibility
          var eligibility = return_eligibility(idocNum)
          if (eligibility) {
            document.getElementById("eligibility").innerHTML = eligibility
          }
        }}> */}

          <TextField label="IDOC Number" name="IDOC_Number" inputRef={register({required: true})} />
          { errors.IDOC_Number && <p>IDOC Number is required.</p> }
          <br />
          <br />
          {submitted && 
            <div className="criteria">
              <div className="criterion">Medical furlough
              {/* Here, we check the "passed" array to see if this particular test was passed.
                  If the given id exists in that array, we set the icon accordingly */}
                {passed.includes(101) ? <CheckCircleIcon style={{ color: green[500] }}/> : <CloseRoundedIcon style={{ color: red[500] }}/> }
              </div>
              <div className="criterion">Over 55 years old
                {passed.includes(102) ? <CheckCircleIcon style={{ color: green[500] }}/> : <CloseRoundedIcon style={{ color: red[500] }}/> }
              </div>
              <div className="criterion">12 months or less left on sentence
                {passed.includes(103) ? <CheckCircleIcon style={{ color: green[500] }}/> : <CloseRoundedIcon style={{ color: red[500] }}/> }
              </div>
              <div className="criterion">Served 25% of prison term
                {passed.includes(104) ? <CheckCircleIcon style={{ color: green[500] }}/> : <CloseRoundedIcon style={{ color: red[500] }}/> }
              </div>
              <div className="criterion">Convicted of class 2, 3, or 4 felony offense
                {passed.includes(105) ? <CheckCircleIcon style={{ color: green[500] }}/> : <CloseRoundedIcon style={{ color: red[500] }}/> }
              </div>
              <div className="criterion">Not convicted of excluded event
                {passed.includes(106) ? <CheckCircleIcon style={{ color: green[500] }}/> : <CloseRoundedIcon style={{ color: red[500] }}/> }
              </div>
            </div>}
          
          <Button type="submit" variant="contained" >Submit</Button>
        </form>
        <div id="jsonData"></div>
        <div id="eligibility"></div>
      </div>
    </div>
  );
}

export default App;