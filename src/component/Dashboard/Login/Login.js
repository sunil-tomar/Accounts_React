import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';
//import {SERVER_URL, URL_ADD_OR_UPDATE, URL_FETCH_NEXT_CHUNK, URL_MONTHLY_EXPANSE } from '../../utils/URL_CONSTANT';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  //{"success":true,"rc":"0","data":{"token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdW5pbCIsImV4cCI6MTY5NDM4NDE3MywiaWF0IjoxNjk0MzY2MTczfQ.XYnVwrceQE3hHruYkTVq4VDBHNKS2auX-cRcx9AtafoJYAV_3fDu16KYu92kgwASDQmM4r1w1sa2BPa-g_OYKA"}}
     const serverLogin = () => {
        const BASEURL = "http://localhost:5050/mastertemplate/api/user/restapi-login";
        axios.post(BASEURL,
                  {"username": username,"password": password}, 
                  {headers: { "Access-Control-Allow-Origin": "*"}}
        ).then((resp)=>{
          if (typeof resp.data === "object" && (resp.data.success==="true" || resp.data.success===true)) { 
           let userToken=resp.data.data.token;
            setToken(userToken);
            //console.log(" token : "+token + "\n userToken : "+userToken);
            onLogin();  
            alert('Login successful'); setError('');
          }else{
            alert('Login failed. Please check your credentials.'); 
            setError('Invalid username or password. Please try again.');
          }
        })
        .catch((err)=>{
          alert('Login failed. Please check your credentials.'); 
          setError('Invalid username or password. Please try again.');
          console.error(err)
            setToken("");
           // onLogin(false);
        });
        
      }

      //login
      serverLogin();

      const getData = () => {
        console.debug("get-Data : "+token);
      const BASEURL = "http://localhost:5050/mastertemplate/api/user/";
      axios.get(BASEURL, { headers: { 'Authorization': `Bearer `+token, "Access-Control-Allow-Origin": "*"}})
      .then((resp)=>{
        console.log(resp)
       // debugger;
      })
      .catch((err)=>{console.error(err)});
      }

      
      getData();


  };
return (
    <div className="login-container">
      <h2>Login {error}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;



/*
const loginAPI = () => {
  alert("get-login");
  const url = "http://localhost:5050/mastertemplate/api";
  const requestOptions = {
      method: 'POST',
      headers: {"Access-Control-Allow-Origin": url,'Content-Type': 'application/json'},
      body: JSON.stringify({'username': 'sunil', 'password':'test'})
  }
  fetch(url+"/user/login", requestOptions)
  .then(response => console.log('Submitted successfully'))
  .catch(error => console.log('Form submit error', error))
    alert("Thank you for contacting Accounts App. We will contact you shortly.");
}*/