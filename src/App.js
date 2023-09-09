import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import Accounts from "./component/Accounts";
import Product from "./component/Product";
import NoPage from "./component/NoPage";
import Login from './component/Dashboard/Login/Login';


export default function App() {
  //App.js
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // Function to handle successful login
    const handleLogin = () => {
      // Perform authentication logic here && If authentication is successful, set isLoggedIn to true
      setIsLoggedIn(true);
    };

    
  return (
<BrowserRouter>
    
    {header()} 
    


{!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
      <Routes>
            {/* {printUrl(window.location.pathname)}  */}
            <Route path="/"  element={<Home />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/product" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/nopage" element={<NoPage />} />
            {/* <Route index  element={<About />} /> */}
        </Routes>


      )}
    
   {footer()}

    </BrowserRouter>
  
  );
}

const printUrl=(pathname)=>{   
    console.log("hit  pathname: "+pathname);
  }

  const header=()=>{
   return <div className="app-header">
            <ul>
            <li><Link to="/">Home </Link></li>
            <li> <Link to="/accounts">Accounts </Link></li>
            <li> <Link to="/product">Product </Link></li>
            <li><Link to="/about">About </Link></li>
            <li> <Link to="/contact">Contact </Link></li>
            <li> <Link to="/QnA">Exam </Link></li>
            </ul>
        </div>
  }


  const footer=()=>{
    return  <div className="app-footer">
             <center>
                <b> Copyright reserve to <a href='/www.youngtiger.com'  target="_blank">www.youngtiger.com</a>
                </b>
              </center>
        </div> 
  }
