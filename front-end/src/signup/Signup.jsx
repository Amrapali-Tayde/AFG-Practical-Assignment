import React, {useState} from 'react';
import axios from 'axios';
/*import "./signup.css";*/
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [formdata, setFormdata ] = useState({
      firstName:"",
      lastName: "",
      email:"",
      dob:"",
      countryCode:"",
      mobile:"",
      password:""
  });

  const navigate = useNavigate();

  /*function handle(e){
    const newdata = {...formdata}
    newdata[e.target.id]=e.target.value
    setFormdata(newdata)
    console.log(newdata)
  } */


  const submitHandler = () =>{
    
    if (!formdata.firstName) {
      alert('Please enter First Name.');
      return;
    }
    
    if (!formdata.lastName) {
      alert('Please enter Last Name.');
      return;
    }

    if (!formdata.email) {
      alert('Please enter Email Id!');
      return;
    }

  /*   // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formdata.email)) {
      alert('Please enter a valid email.');
      return;
    } */

    if (!formdata.dob) {
      alert('Please enter Date of Birth.');
      return;
    }
    
    if (!formdata.countryCode) {
      alert('Please enter Country Code.');
      return;
    }
    
    if (!formdata.mobile) {
      alert('Please enter Mobile Number.');
      return;
    }
   
    if (!formdata.password) {
      alert('Please enter password.');
      return;
    }
   
    if (formdata.password.length < 6) {
      alert('Password must be atleast 6 characters.');
      return;
    }

    const postUrl = "https://vigilant-space-fortnight-x59wqvqj9p5qh6v57-5000.app.github.dev/api/signup";   ///api/signup

    axios.post(postUrl,formdata)
    .then(res=>{
        //console.log(res.data);
        navigate('/login');
    })
    .then((error)=>{
      console.log(error);
    });
    
    /*const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const dob = e.target.dob.value;
    const countryCode = e.target.countryCode.value;
    const mobile = e.target.mobile.value;
    const password = e.target.password.value;
*/
    
  }
  return (

<div className="container mt-5">
<div className="row justify-content-center">
<div className="col-12 col-md-7 col-lg-9">
    <div className="card">
      <div className="card-header"><h3>Sign - Up</h3></div>
      <div className="card-body">     
          <div className="row mt-2">
            <div className="col-md-6 form-group">
              <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName" 
                  required
                  onChange={(e)=> setFormdata({...formdata, firstName:e.target.value})}
                  value={formdata.firstName}
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
                  onChange={(e)=> setFormdata({...formdata, lastName:e.target.value})}
                  value={formdata.lastName}
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
                  onChange={(e)=> setFormdata({...formdata, email:e.target.value})}
                  value={formdata.email}
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
                  onChange={(e)=> setFormdata({...formdata, dob:e.target.value})}
                  value={formdata.dob}
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
                  onChange={(e)=> setFormdata({...formdata, countryCode:e.target.value})}
                  value={formdata.countryCode}
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
                  onChange={(e)=> setFormdata({...formdata, mobile:e.target.value})}
                  value={formdata.mobile}
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
                  onChange={(e)=> setFormdata({...formdata, password:e.target.value})}
                  value={formdata.password}
                  minLength={6}
                />
            </div>
          </div>
          <div className="row mt-3 px-5">                                  
              <button type="button" className="btn btn-success" onClick={submitHandler}>Submit</button>            
          </div>
    

          <div className="row mt-4">                
            <div className="col-md-12  text-center">
              <p>Already have an Account?  </p>
                <Link to="/" >Login</Link>
              
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
