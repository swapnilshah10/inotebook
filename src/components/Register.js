import React from 'react'
import axios from 'axios'
import { useState } from "react"

import {
  Link
} from "react-router-dom";

let url = "https://inotebook123.herokuapp.com/login/register/";
function Register(props) {
        
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");   
        const [first, setFirst] = useState("");
        const [last, setlast] = useState("");
        const [email, setemail] = useState("");
           
          let onpassChange = e => {
            setPassword(e.target.value);
          };

          let onnameChange = e => {
            setUsername(e.target.value);
          };
          let onfirstChange = e => {
            setFirst(e.target.value);
          };
          let onlastChange = e => {
            setlast(e.target.value);
          };
          let onemailChange = e => {
            setemail(e.target.value);
          };
          
         let handleSubmit = async (e) => { 
            e.preventDefault();
            const data = {
              username: username,
              password: password,
              password2: password,
              first_name : first,
              last_name : last,
              email : email
            };
            await axios
              .post(url, data)
              .then(res=>{props.childToParent(res.data.token);})
              .catch(err => console.log(err.request.responseText));
            };
  return (
    <div>
        <div className="login-form">
    <form>
      <h1>Register</h1>
      <div className="content">
        <div className="input-field">
          <input type="email" placeholder="Username" value = {username} onChange={onnameChange} />
        </div>
        <div className="input-field">
          <input type="email" placeholder="Email" value = {email} onChange={onemailChange} />
        </div>
        <div className="input-field">
          <input type="email" placeholder="First Name" value = {first} onChange={onfirstChange} />
        </div>
        <div className="input-field">
          <input type="email" placeholder="Last Name" value = {last} onChange={onlastChange} />
        </div>
        <div className="input-field">
          <input type="password" placeholder="Password" value = {password} onChange={onpassChange}/>
        </div>
       
      </div>
      <div className="action">
        <button onClick = {handleSubmit}>Register</button>
        
        <Link to = '/apistest'>
        <button>Log in </button>
        </Link>
      </div>
    </form>
  </div>
  </div>
  )
}

export default Register