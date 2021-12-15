import React, { useState, ChangeEvent, FormEvent } from "react";
import Register from "./Register";
import { useHistory } from 'react-router-dom'; 

type Props = {
  setCurrentView: Function,
  setUserData: Function,
};



const Login = ({ setCurrentView, setUserData }: Props ) => {

  let history = useHistory(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [register, setRegister] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    setSubmitted(true);
    e.preventDefault();
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        { 
          email,
          password,
        }
      ),
    };
    fetch ('/user/login', reqParams)
      .then((res) => res.json())
      .then((res) => {
        if (res.confirmed === true){
          console.log('User has logged in')
          setUserData(
            {
              email: res.userInfo.email,
              firstName: res.userInfo.firstName,
              lastName: res.userInfo.lastName,
              arn: res.userInfo.arn
            }
          )
          setCurrentView('dashboard'); 
          history.push('/home');
        }
        else {
          console.log('Something went wrong with user sign in')
          alert("Sorry, we could not find that username or password. Please try again or register for an account.")
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

    // send to register view if they need an account
    const handleRegister = () => {
      console.log("clicked register")
      setRegister(true);
    }

    return(
      <React.Fragment>
      { register ? <Register setCurrentView={setCurrentView} setRegister={setRegister}/> :
      
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
          {submitted && !password ? <span className = "error-messages">Please enter a password.</span> : null}
          <button 
            className="landing-button"
            type="submit" 
            onClick={(e) => handleSubmit(e)}>
            Login
          </button>
          <button 
            className="landing-button"
            onClick={() => handleRegister()}>
            Register
         </button> 
        </form>
      </div>
    </div>
    }
    </React.Fragment>
  )
}

export default Login;