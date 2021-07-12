import React, {useState} from "react";
import Base from "../core/Base";
import { Link , Redirect} from "react-router-dom";

import {signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = ()=>{

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

    const onSubmit = event =>{
        event.preventDefault();
        setValues({...values,error: false, loading: true});
        signin({email, password})
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }else{
                authenticate(data, () =>{
                    setValues({...values, didRedirect: true})
                });
            }
        })
        .catch(error => console.log("Signin request fail", error));
    }


    const performRedirect = () =>{
        // TODO
        if(didRedirect){
            // ye user line no. 10 me isAuthenticated() se set hua h
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }
            else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    };

    // different type of syntax is used in below function but it can also be done using if(loading)=>{do the task}
      const loadingMessage = () => {
          return (
              loading && (
                  <div className="alert alert-info">
                      <h2>loading...</h2>
                  </div>
              )
          )
      };
     
     
     const errorMessage = () => {
        return ( 
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
          {error}
         </div>
         );
     }

    const signInForm = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left py-3">
                    <form className="container-fluid py-5">
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input onChange= {handleChange("email")} value={email} className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input onChange= {handleChange("password")} value={password} className="form-control" type="Password" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block mt-3">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Signin Page" description=" A Page for user to sign in!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            { performRedirect() }
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}


export default Signin;