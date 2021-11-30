import React, { useState } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

//TO DO - need to hook up to the App level page and then create routes to redirect to Dashboard once username/pw are validated OR redirect to registration page which will then redirect back to this page when user has successfully registered

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

    // Need logic for submit to redirect to the dashboard
    const handleSubmit = (e: any) => {
      e.preventDefault(); //avoid page refresh
      console.log(email, password) //did state set? -- yes
      const reqParams = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      };

      fetch ('/login', reqParams)
      .then(res => res.text())          // convert to plain text
      .then(text => console.log(text)) // console log that to see the error
      // .then((res) => res.json())
      // .then((res) => {
      //   if(res){
      //     alert("You are logged in!");
      //     history.push('/'); // send to dashboard view
      //   } else {
      //     alert("Please check your login information");
      //   }
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    }
    
    //want to register for an account send to register view
    const handleRegister = () => {
      history.push('./Register');
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
    </div>
    )
}

export default Login;