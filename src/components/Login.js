import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import {useNavigate, Navigate} from 'react-router-dom';


function Login () {
   const navigate = useNavigate();
   
    const submitHandler = (e) =>{
        e.preventDefault();
       
        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(email === "" || password === ""){
             swAlert(<h2>Fields can not be empty</h2>)
            return; 
        }
        
        if(email !== "" && !regexEmail.test(email)){
        swAlert( <h2>You must enter a valid email address</h2>)
          return; 
        }

        if(email !== "challenge@alkemy.org" || password !== "react"){
            swAlert(<h2>Wrong authentication</h2>)
            return;
        }
       
     axios.post("http://challenge-react.alkemy.org", {email, password})
     .then(res => {
        swAlert(<h2>Successful login</h2>)
        const resToken = res.data.token;
        sessionStorage.setItem("token", resToken);
        navigate('/list');
     })
       

    }

    let token = sessionStorage.getItem("token");

    return (
        <> 
        {token && <Navigate to={"/list"} replace/>}

        <h2 className='text-center header '>Log In</h2>
        <form onSubmit={submitHandler} className="w-50 container mt-1">
        <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="text" className="form-control" id="email" name="email" aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
        </form>

        </>
    );
};

export default Login;

