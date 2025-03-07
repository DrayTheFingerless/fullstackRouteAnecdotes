import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

import { useReducer } from 'react'
import { loginUser } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";
import { createNotif } from "../reducers/notificationReducer";


const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
      event.preventDefault();
      try {
        dispatch(loginUser(username,password))
        dispatch(createNotif("Logged in with user " + username, true));
        setUsername("");
        setPassword("");
      } catch (exception) {
        dispatch(createNotif("Wrong credentials", false));
      }
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
