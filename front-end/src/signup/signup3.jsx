import React, {useEffect, useState} from 'react';
import axios from 'axios';
/*import "./signup.css";*/
import { Link } from "react-router-dom";

const Signup = () => {

  const [formdata, setFormdata ] = useState([{}]);

  function handle(e){
    const newdata = {...formdata}
    newdata[e.target.id]=e.target.value
    setFormdata(newdata)
    console.log(newdata)
  }


  const submitHandler = (e) =>{
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const dob = e.target.dob.value;
    const countryCode = e.target.countryCode.value;
    const mobile = e.target.mobile.value;
    const password = e.target.password.value;

    const url="/api/signup";
    axios.post(url, {
      firstName,
      lastName,
      email,
      dob,
      countryCode,
      mobile,
      password
    })
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
      console.log(error);
  });
  }
  return (

<div className="container mt-5">
<div className="row justify-content-center">
  <div className="col-md-6">
    <div className="card">
      <div className="card-header"><h3>Sign Up</h3></div>
      <div className="card-body">
        <form onSubmit={submitHandler}>
          <div className="row mt-2">
            <div className="col-md-6 form-group">
              <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName" 
                  required
                  onChange={(e)=> handle(e)}
                  value={FormData.firstName}
                />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName" 
                  required
                />
            </div>
          </div>
          
          <div className="row mt-3">
            <div className="col-md-6 form-group">
              <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email" 
                  required
                />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob" 
                  required
                />
            </div>
          </div>          
          
          <div className="row mt-3">
            <div className="col-md-2 form-group">
              <label htmlFor="countryCode">Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="countryCode"
                  name="countryCode" 
                  required
                />
            </div>
            <div className="col-md-4 form-group">
              <label htmlFor="mobile">Mobile No.</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile" 
                  required
                />
            </div>
            
            <div className="col-md-6 form-group">
              <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password" 
                  required
                />
            </div>
          </div>
          <div className="row mt-3 px-5">    
                              
              <button type="submit" className="btn btn-success">Submit</button>
            
          </div>
          </form>

          <div className="row mt-4">                
            <div className="col-md-12  text-center">
              <p>Already have an Account?  </p>
                <Link to="/login" type="submit" className="btn btn-primary">
                  Login
                </Link>
              
            </div>
          </div>
          
        </div>
        
      </div>
    
    </div>
    
  </div>
  
</div>
 
  )
}

export default Signup
