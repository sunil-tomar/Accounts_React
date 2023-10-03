import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';
import { SERVER_BASE_URL, URL_USER_LOGIN } from '../../../Utils/URL_CONSTANT';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const getUsersData = async () => {
        try {  
          const BASEURL = SERVER_BASE_URL+"/user/";
          const response = await axios.get(BASEURL, { withCredentials: true});
          // Handle the response data
          console.log('Users Data:', response.data);
        } catch (error) {
          console.error('Failed to fetch users data:', error.message);
        }
      };


  const login = async (username, password) => {
        console.log(" usernmae : "+username + "password : "+password);
        const BASEURL = SERVER_BASE_URL+URL_USER_LOGIN;
        try {
          const response = await axios.post(BASEURL, {username, password} );
            if (response.data.success) {
              // If successful, return the response data or token.
              onLogin();  
              
              // Call the function to fetch user data after logging in
              getUsersData();
              return response.data;
            } else {
      // Handle login failure.
      throw new Error('Login failed');
    }
          console.log('Login successful');
        } catch (error) {
          console.error('Login failed:', error.message);
        }
      };
      
      login(username, password); //login

      

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

