import React from 'react';
import "./signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className='addUser'>
        <h3>Sign Up</h3>
        <form className="addUserForm">
            <div className='inputGroup'>
                <label htmlFor="email">Email: </label>
                <input 
                type="email"
                name="email"
                id="email"
                autoComplete='off'
                placeholder='Enter your Email ID'
                 />

                <label htmlFor="firstname">First Name: </label>
                <input 
                type="text"
                name="firstname"
                id="firstname"
                autoComplete='off'
                placeholder='Enter your First Name'
                 />


                <label htmlFor="lastname">Last Name: </label>
                <input 
                type="text"
                name="lastname"
                id="lastname"
                autoComplete='off'
                placeholder='Enter your Last Name'
                 />
                

                <label htmlFor="dob">Date of Birth: </label>
                <input 
                type="date"
                name="dob"
                id="dob"
                autoComplete='off'
                placeholder='Enter your Date of Birth'
                 />
                 
                <label htmlFor="dob">Country Code: </label>
                <select 
                name="countryCode"
                id="countryCode"
                autoComplete='off'
                placeholder='Select Coutry Code'
                 />
                
                <label htmlFor="mobile">Mobile Number: </label>
                <input 
                type="number"
                name="mobile"
                id="mobile"
                autoComplete='off'
                placeholder='Enter your Mobile Number'
                 />                 

                <label htmlFor="password">Password: </label>
                <input 
                type="password"
                name="password"
                id="password"
                autoComplete='off'
                placeholder='Enter your password'
                 />
                 
                <button type="button" class="btn btn-success">Sign Up</button>
            </div>
        </form>
        <div className="login">
        <p>Already have an Account? </p>
        <Link to="/login" type="submit" class="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  )
}

export default Signup
