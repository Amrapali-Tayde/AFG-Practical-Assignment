import './App.css';
import Signup from './signup/Signup';
import Login from "./login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from './dashboard';
import axios from 'axios';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("authtoken");
  config.headers.Authorization =  token;   
  return config;
});

function App() {

 
  const route = createBrowserRouter([    
    {
      path:"/",
      element: <Login />,
    },
    {
      path:"/signup",
      element: <Signup />,
    },
    {
      path:"/dashboard",
      element: <Dashboard />,
    }

  ]); 

  return (
    <div className="App">

      <RouterProvider router={route}></RouterProvider>

    </div>
  );
}

export default App;
