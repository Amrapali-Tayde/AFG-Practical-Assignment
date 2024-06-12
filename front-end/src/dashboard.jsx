import React, { useEffect, useState } from "react";
import axios from 'axios';

function Dashboard() {

    const [token, setToken] = useState(null);
    const [userdata, setUserData] = useState(null);

    useEffect(() => {

        const getProfile = async () => {
            if (!token) {
                console.log("Inside if (!token):", localStorage.getItem("authtoken"));
                setToken(localStorage.getItem("authtoken"));
                // axios  profile api pass header "authorisation": "token_value"
                // on server extract token from header and decyrpt it to get email id
                // useing the email id find user in db and if exists then send profile info else send error   

                const profileUrl = "https://vigilant-space-fortnight-x59wqvqj9p5qh6v57-5000.app.github.dev/api/profile";

                const response = await axios({
                    method: 'get',
                    url: profileUrl
                });

                console.log("Profile API response: ", response.data);

                localStorage.setItem("profile", JSON.stringify(response.data.data.profile));

                const storedData = localStorage.getItem('profile');
                // if (storedData) {
                //     setUserData(JSON.parse(storedData));
                // }

                if (storedData) {
                    try {
                        setUserData(JSON.parse(storedData));
                    } catch (error) {
                        console.error('Error parsing localStorage data', error);
                    }
                }
            }
        };

        getProfile();

        console.log("Inside useEffect");

    }, [token]);

    if (!userdata) {
        return <h4>No data found in Local Storage</h4>;
      }

    return (

        <>

<div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-5">
         
           
              <div className="row mt-2">
              <div className="col-md-2"></div>
              <div className="col-md-8 px-3 ml-3"></div>
              <div className="text-left">
              <h2 className="text-primary">Welcome { userdata.firstName }!</h2>
              </div>
            {/* <h4>User Details:</h4>
            <span><strong>First Name: </strong> { userdata.firstName }</span><br />
            <span><strong>Last Name: </strong> { userdata.lastName }</span> */}
            
            {/* <div>{token}</div>   */}
            
            <ul className="text-danger mb-2 mt-3 ml-5 pl-5"> <h4>User Details: </h4>
                {Object.entries(userdata).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </ul>
            {/* <h4>{JSON.stringify(userdata, null, 2)}</h4> */}
                </div>
                </div>
                </div>
                </div>
             
    


      
        </>

    )
}

export default Dashboard;