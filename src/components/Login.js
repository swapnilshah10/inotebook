import React from "react";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

// let url = "http://127.0.0.1:8000/login/";

let url = "https://inotebook123.herokuapp.com/login/";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let onpassChange = (e) => {
    setPassword(e.target.value); 
  };

  let onnameChange = (e) => {
    setUsername(e.target.value);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    await axios
      .post(url, data)
      .then((res) => { 
        console.log(res) 
        props.childToParent(res.data.token);
        localStorage.setItem('token', res.data.token)
        setLogin(true);
      })
      .catch((err) => console.log(err.request.responseText));
  };
  const [isLoggedIn, setLogin] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/notes" />;
  }

  return (
    <div>
      <div className="login-form">
        <form>
          <h1>Login</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="email"
                placeholder="Username"
                value={username}
                onChange={onnameChange}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={onpassChange}
              />
            </div>
          </div>
          <div className="action">
            <Link to="/register">
              <button>Register</button>
            </Link>
            <button onClick={handleSubmit}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
