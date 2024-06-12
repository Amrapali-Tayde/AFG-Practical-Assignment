import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import {
//   GoogleReCaptchaProvider,
//   useGoogleReCaptcha
// } from 'react-google-recaptcha-v3';

const Login = () => {

  const [loginData, setdata] = useState({
    email: "",
    password: "",
    //recaptoken: "",
  });

 
  // useEffect(() => {
  //   const loadRecaptcha = async () => {

  //     console.log('aaaaa');
  //     if (window.grecaptcha) {
  //       const token = await window.grecaptcha.execute('6Lexv_QpAAAAAHtbgpQPdMMH-yOlnBNmf8sW1pRR', { action: 'submit' });
  //       console.log(token);
  //       console.log('Amrapali');
  //       setdata({ ...loginData, recaptoken: token })
  //     }
  //     else {
        
  //     console.log('bbbbb');
  //     }

  //   };

  //   loadRecaptcha();
  // }, []);

  const navigate = useNavigate();

  const submitHandler = () => {

    if (!loginData.email) {
      alert('Please enter Email Id!');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      alert('Please enter a valid email.');
      return;
    }

    if (!loginData.password) {
      alert('Please enter password.');
      return;
    }

    if (loginData.password.length < 6) {
      alert('Password must be atleast 6 characters.');
      return;
    }

    const postUrl = "https://vigilant-space-fortnight-x59wqvqj9p5qh6v57-5000.app.github.dev/api/login";

    axios.post(postUrl, loginData)
      .then(res => {
        // console.log(res.data);
        if (res.data.success === true) {
          localStorage.setItem("authtoken", res.data.data.token);
          navigate('/dashboard');
        }
        else {
          alert(res.data.message);
        }
      })
      .then((error) => {
        console.log(error);
      });

  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-5">
          <div className="card">
            <div className="card-header"><h3>Login In</h3></div>
            <div className="card-body">
              <div className="row mt-2">
                <div className="form-group">
                  <label htmlFor="email" className=" mb-1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={(e) => setdata({ ...loginData, email: e.target.value })}
                    value={loginData.email}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password" className="mb-1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={(e) => setdata({ ...loginData, password: e.target.value })}
                    value={loginData.password}
                  />
                </div>
              </div>

              <div className="row mt-3 px-5">
                {/* <GoogleReCaptchaProvider reCaptchaKey="">
    <YourReCaptchaComponent />
  </GoogleReCaptchaProvider> */}
                <button type="button" className="btn btn-primary" onClick={submitHandler}>Login</button>
              </div>
              <div className="row mt-4">
                <div className="col-md-12  text-center">
                  <p>Don't have Account? </p>
                  <Link to="/signup" >Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;