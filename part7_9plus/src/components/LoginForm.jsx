import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

import { useReducer } from 'react'
import { loginUser } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";


const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
      event.preventDefault();
      dispatch(loginUser(username,password))
      setUsername("");
      setPassword("");
    };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          data-testid="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          data-testid="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
