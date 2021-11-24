import React, { useState } from "react";

//TO DO - need to hook up to the App level page and then create routes to redirect to Dashboard once username/pw are validated OR redirect to registration page which will then redirect back to this page when user has successfully registered

const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    })
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false); //initial logic for checking username/pw switch

    const handleEmail = (e: any) =>{
        setValues({...values, email: e.target.value})
    }
    
    const handlePassword = (e: any) =>{
        setValues({...values, password: e.target.value})
    }
    // Need logic for submit to redirect to the dashboard
    const handleSubmit = (e: any) => {
        e.preventDefault(); //stop refresh
        if (values.email && values.password){
          setValid(true);
          // Need logic for submit to redirect to the dashboard
        }
        setSubmitted(true);
    }

    return(
    <div className="form-container">
      <form className="register-form" onSubmit = {handleSubmit}>
        <input
          id="email"
          className="form-field"
          type="text"
          placeholder="Email"
          value = {values.email}
          onChange={handleEmail}
        />
        {submitted && !values.email ? <span>Please enter an email address.</span> : null}
        <input
          id="password"
          className="form-field"
          type="password"
          placeholder="Password"
          value = {values.password}
          onChange = {handlePassword}
        />
        {submitted && !values.password ? <span>Please enter a password.</span> : null}
        <button className="form-field" type="submit">
          Login
        </button>
        {/* Should redirect with React router to new sign up page */}
        <span><a href = "">Click here to sign up for an account</a></span>
      </form>
    </div>
    )
}

export default Login;