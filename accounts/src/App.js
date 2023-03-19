import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import Accounts from "./component/Accounts";
import NoPage from "./component/NoPage";


export default function App() {
  //App.js
  return (
<BrowserRouter>
      <div className="app-header">
      <Link to="/">Home </Link>
      <Link to="/accounts">Accounts </Link>
      <Link to="/about">About </Link>
      <Link to="/contact">Contact </Link>
      </div>
  <Routes >
           {printUrl(window.location.pathname)} 
          <Route path="/"  element={<Home />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/nopage" element={<NoPage />} />
          {/* <Route index  element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

const printUrl=(pathname)=>{   
    console.log("hit  pathname: "+pathname);
  }

