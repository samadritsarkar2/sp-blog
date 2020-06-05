import React, {useState} from 'react';
import Base from "./Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../Api/AuthAPI";


const Signin = () => {

    const [values, setValues] = useState({
      email: "",
      password: "",
      error: "",
      loading: false,
      didRedirect: false,
    });

    const { email, password, error, loading, didRedirect} = values;

    const {user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error : false, [name] : event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error : false, loading : true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error, loading:false})
            } else {
                authenticate(data, ()=>{
                    setValues({
                        ...values,
                    didRedirect : true
                    })
                })
            }
        })
        .catch(console.log("Signin request failed"))
    }

    const performRedirect = () =>{
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/" />
            } else { 
                return <Redirect to="/" />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
          loading && (
              <div className="alert alert-info">
                  <h2>Loading...</h2>
              </div>
          )
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
    

    const signInForm = () =>{
        return(
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-dark">Email</label>
                            <input value={email} onChange={handleChange("email")} className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Password</label>
                            <input  value={password} onChange={handleChange("password")} className="form-control" type="password" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div>
        
        <Base title="Signin Page">
       {loadingMessage()}
       {errorMessage()}
        {signInForm()}
        {performRedirect()}
        <br></br>
        <p className="text-dark text-left text-lg-center">Don't have an account? <Link to="/signup">Signup Here</Link> </p>
        </Base>
        </div>
    )
}

export default Signin;