import './App.css';
import Signup from './signup/Signup';
import Login from "./login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

  const [formdata, setFormdata ] = useState([{}]);

 /* useEffect(()=>{
    fetch("/getURL")
    .then(respo = respo.json())
    .then(data=>setFormdata(data))
  },[]); */

useEffect(()=>{
  axios.get('getURL')
  .then((res)=>{
    setFormdata(res.data);
  })
})

  const route = createBrowserRouter([
    {
      path:"/",
      element: <Signup />,
    },
    {
      path:"/login",
      element: <Login />,
    },

  ]); 

  return (
    <div className="App">

      <RouterProvider router={route}></RouterProvider>

    </div>
  );
}

export default App;
