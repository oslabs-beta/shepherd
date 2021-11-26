import React, { useState } from "react";
import Login from './Login';
//TO DO - 
//Login page should redirect here when button to register is clicked
//Upon successful registration user should be redirected back to login 
//Need to add all the logic for hooking up AWS account as well as storing that information into the db here

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmit] = useState(false);
      // Need logic for submit to redirect to the dashboard
      const handleSubmit = (e: any) => {
          e.preventDefault(); //stop refresh
          if (email && password){
            setSubmit(true);
            // Save into database somehow
            const reqParams = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
              };
            //Redirect back to the login page
            return(
                <Login />
            )
          }
      }
  
      return(
      <div className="form-container">
        <h1>Registration Page</h1>
        <form className="sign-up-form" onSubmit = {handleSubmit}>
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
          {submitted && !email ? <span>Please enter an email address.</span> : null}
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
          {submitted && !password ? <span>Please enter a password.</span> : null}
          <button 
            className="form-field" 
            type="submit" 
            onClick={handleSubmit}>
            Register
          </button>
        </form>
      </div>
      )
  }
  
  export default Register;