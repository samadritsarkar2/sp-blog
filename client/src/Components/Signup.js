import React, {useState} from 'react';
import Base from "./Base";
import { Link, Redirect } from "react-router-dom";
import { signup, isAuthenticated } from '../Api/AuthAPI';



const Signup = () => {

    const [values, setValues] = useState({
        name : "",
        email : "",
        password : "",
        error : "",
        success : false
    });

    const {name, email, password, error, success} = values;

    const handleChange = name => event => {
        setValues({ ...values, error : false, [name] : event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error : false});
        signup({name, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false});
            } else {
                setValues({
                    name : "",
                    email : "",
                    password : "",
                    error : "",
                    success : true
                });
            }
        })
        .catch(console.log("Error in Signup"));
    } 

    const successMessage = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-success"
          style={{ display: success ? " " : "none" }}
        >
          New account was created successfully. Please{" "}
          <Link to="/signin">login here</Link>
        </div>
        </div>
        </div>
      );
    };

    const errorMessage = () => {
        return (
          <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
          </div>
          </div>
          
        );
      };
      const performRedirect = () =>{
        
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const signUpForm = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group">
                <label className="text-dark">Name</label>
                <input
                  onChange={handleChange("name")}
                  className="form-control"
                  type="text"
                  value={name}
                />
              </div>
              <div className="form-group">
                <label className="text-dark">Email</label>
                <input
                  onChange={handleChange("email")}
                  className="form-control"
                  type="email"
                  value={email}
                />
              </div>
              <div className="form-group">
                <label className="text-dark">Password</label>
                <input
                  onChange={handleChange("password")}
                  className="form-control"
                  type="password"
                  value={password}
                />
              </div>
              <button onClick={onSubmit} className="btn btn-success btn-block">
                Submit
              </button>
            </form>
            <p className="text-dark text-left text-lg-center">Already have an account? <Link to="/signin">Signin Here</Link> </p>
          </div>
        </div>
      );
    };


    return (
        <div>
        <Base title="Signup " >
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            {performRedirect()}
        </Base>
        </div>
    )
}

export default Signup;