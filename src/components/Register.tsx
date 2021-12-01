import React, { useState } from "react";
import Login from './Login';
//TO DO - 
//Login page should redirect here when button to register is clicked
//Upon successful registration user should be redirected back to login 
//Need to add all the logic for hooking up AWS account as well as storing that information into the db here

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [regionSelect, setRegion] = useState('us-east-2');
    const [arn, setArn] = useState('');
    const [currentView, setCurrentView] = useState('register');
      
      //template url opening a new window they have embedded in their code
      //input box and and a hyperlink
      //takes to new url --> we dont' have dialed in rn so put google homepage

      const handleRegister = (e: any) => {
        setSubmitted(true);
        e.preventDefault(); //avoid page refresh
        const reqParams = { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: email, 
            firstName: firstName,
            lastName: lastName,
            password: password, 
            arn: arn
          }),
        };
        fetch ('/user/signup', reqParams)
        .then((res) => res.json())
        .then((res) => {
          console.log('User has registered')
          // set current view hook and set to login page
          setCurrentView('login'); 
        })
        .catch((error) => {
          console.error(error);
        });
      }
  
      return(
      <div className= "landing">

      { currentView === 'login' ? <Login /> : null }
      { currentView === 'register' ? <Register /> : null }

        <div className= "heading">
          <i className="fab fa-wolf-pack-battalion shepherd-icon"></i> 
          SHEPHERD
        </div>
        <div className="form-container">
          <form className="register-form" onSubmit = {handleRegister}>
            <p className="register-title">REGISTER FOR AN ACCOUNT</p>
            <input
              id="first-name"
              className="form-field"
              type="text"
              placeholder="First Name"
              value = {firstName}
              onChange={(e: any) => {
                setFirstName(e.target.value);
            }}
            />
            {submitted && !firstName ? <span className = "error-messages">Please enter your first name.</span> : null}
            <input
              id="last-name"
              className="form-field"
              type="text"
              placeholder="Last Name"
              value = {lastName}
              onChange={(e: any) => {
                setLastName(e.target.value);
            }}
            />
            {submitted && !lastName ? <span className = "error-messages">Please enter your last name.</span> : null}
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
            It's quick and easy to connect your AWS account to Helios! Just follow
          the below steps and we'll get you all set up!
          <ol>
            <li>
              {/* change link to: */}
              {/*'https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=[NAME OF STACK YOU WANT CREATED]&templateURL=[S3 LINK TO THE YAML TEMPLATE FILE]'  */}
              <a
                target='_blank'
                href='http://google.com'
                className="aws-link"
              >
                Add Shepherd CloudFormation stack to AWS
                
              </a>
            </li>
            <li>
              Make sure you check "I acknowledge that AWS CloudFormation might
              create IAM resources."
            </li>
            <li>Click "Create"</li>
            <li>
              Wait until the stack creation completes. Then head to the
              "Outputs" tab. Copy the "ARN" value below!
            </li>
          </ol>
          <input
            id='arn'
            className="form-field"
            placeholder="ARN"
            value = {arn}
            onChange={(e) => {
              setArn(e.target.value);
          }} />  
          <button 
            className="landing-button"
            type="submit" 
            onClick={handleRegister}>
            Register
          </button>

          </form>
        </div>
      </div>
      )
  }
  export default Register;