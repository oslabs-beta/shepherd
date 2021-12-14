import React, { useState, ChangeEvent, FormEvent } from "react";
import Login from './Login';
//TO DO - 
// Add back button

const Register = (props: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [arn, setArn] = useState('');
  const [login, setLogin] = useState(false);

    const handleRegister = (e: FormEvent) => {
      setSubmitted(true);
      e.preventDefault(); //avoid page refresh
      const reqParams = { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          { 
            email, 
            firstName,
            lastName,
            password, 
            arn,
          }
        ),
      };
      fetch ('/user/signup', reqParams)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          console.log('User has registered')
          // set current view hook and set to login page
          props.setCurrentView('login'); 
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const handleBack = () => {
      setLogin(true);
      props.setRegister(false);
      props.setCurrentView('login');
    }

    return(
      <React.Fragment>
      {/* { login ? <Login /> : */}
        <div className= "landing">
          <div className="form-container">
            <form className="register-form" onSubmit = {handleRegister}>
              <p className="register-title">REGISTER FOR AN ACCOUNT</p>
              <input
                id="first-name"
                className="form-field"
                type="text"
                placeholder="First Name"
                value = {firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
            <div className="AWS-text">
              <p>Connect your AWS account to Shepherd by following the steps below:</p>
              <ul>
                <li>
                {/* change link to: our stack */}
                  <a
                  target='_blank'
                  href='http://google.com'
                  className="aws-link"
                  > Add Shepherd CloudFormation stack to AWS </a>
                </li>
                <li> Make sure you check "I acknowledge that AWS CloudFormation might
                create IAM resources."</li>
                <li>Click "Create"</li>
                <li>Once stack creation has completed, head to the "Outputs" tab and look for your "ARN" string. Copy the "ARN" and paste into the text box below.  </li>
              </ul>
            </div>
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
              onClick={(e) => handleRegister(e)}>
              Register
            </button>
            <button 
              className="landing-button"
              type="submit" 
              onClick={() => handleBack()}>
              Go Back
            </button>
          </form>
        </div>
      </div>
      {/* }  */}
      </React.Fragment>
    )
  }
  export default Register;