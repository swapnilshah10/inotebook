import React from 'react'
import axios from 'axios'
import { useState } from "react"
import {
  Link
} from "react-router-dom";

let url = "http://127.0.0.1:8000/login/";
function Login(props) {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        let onTitleChange = e => {
            setEmail(e.target.value);
          };
           
          let onpassChange = e => {
            setPassword(e.target.value);
          };
         let handleSubmit = async (e) => { 
            e.preventDefault();
            const data = {
              username: email,
              password: password
            };
            await axios
              .post(url, data)
              .then(res=>{
                props.childToParent(res.data.token);
              console.log(res.data.token);})
              .catch(err => console.log(err));
            };
  return (
    <div>
        <div className="login-form">
    <form>
      <h1>Login</h1>
      <div className="content">
        <div className="input-field">
          <input type="email" placeholder="Email" value = {email} onChange={onTitleChange} />
        </div>
        <div className="input-field">
          <input type="password" placeholder="Password" value = {password} onChange={onpassChange}/>
        </div>
       
      </div>
      <div className="action">
        <button>Register</button>
        <button onClick = {handleSubmit}>Sign in</button>
        <Link to = '/apistest'>
        <button>Log in </button>
        </Link>
      </div>
    </form>
  </div>
  </div>
  )
}

export default Login