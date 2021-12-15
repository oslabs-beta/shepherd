import React, { useState, ChangeEvent, FormEvent } from "react";
import Login from './Login';

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
                  href='https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3Ffromtb%3Dtrue%26hashArgs%3D%2523%26isauthcode%3Dtrue%26nc2%3Dh_ct%26src%3Dheader-signin%26state%3DhashArgsFromTB_us-east-1_3b801900dfabe943&client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fcanvas&forceMobileApp=0&code_challenge=kVDrr4f7CICPSo9coT4i8SIaOhRvBOf1IoepozA5s9I&code_challenge_method=SHA-256'
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