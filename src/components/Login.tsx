import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Register from "./Register";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState('login');
  const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: any) => {
      setSubmitted(true);
      e.preventDefault(); //avoid page refresh
      const reqParams = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      };
      fetch ('/user/login', reqParams)
      .then((res) => res.json())
      .then((res) => {
        console.log('User has logged in')
        // set current view hook and set to dashboard
        setCurrentPage('dashboard'); 
      })
      .catch((error) => {
        console.error(error);
      });
    }
    
    // send to register view if they need an account
    const handleRegister = () => {
      console.log("clicked register")
      setCurrentPage('register');
    }

    return(
    <div className = "landing">
      <div className="heading">
        <i className="fab fa-wolf-pack-battalion shepherd-icon"></i>
          SHEPHERD
        </div>
        <div className="form-container">
        <form className="register-form" onSubmit = {handleSubmit}>
          <p className= "register-title">LOGIN</p>
        <input
          id="email"
          className="form-field"
          type="text"
          placeholder="Email"
          value = {email}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        {submitted && !email ? <span className = "error-messages">Please enter an email address.</span> : null}
        <input
          id="password"
          className="form-field"
          type="password"
          placeholder="Password"
          value = {password}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        {submitted && !password ? <span className = "error-messages">Please enter a password.</span> : null}
        <button 
          className="landing-button"
          type="submit" 
          onClick={handleSubmit}>
          Login
        </button>
        <button 
          className="landing-button"
          onClick={handleRegister}>
          Register
         </button> 
        </form>
      </div>
      { currentPage === 'register' ? <Register /> : null }
      { currentPage === 'dashboard' ? <Dashboard /> : null }
    </div>
    )
}

export default Login;