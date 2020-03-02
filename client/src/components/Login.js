import React, { useState } from "react";
import axios from "axios";

import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const LoginStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .formContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #fff;
    padding: 2rem;
    border-radius: 15px;
    -webkit-box-shadow: 0px 10px 40px -4px rgba(255, 255, 255, 1);
    -moz-box-shadow: 0px 10px 40px -4px rgba(255, 255, 255, 1);
    box-shadow: 0px 10px 40px -4px rgba(255, 255, 255, 1);
  }

  h1 {
    text-transform: uppercase;
    font-weight: 900;
    border-bottom: 1px solid black;
    padding: 3px;
  }

  h3 {
    text-transform: uppercase;
    margin-bottom: -5px;
  }
  button {
    width: 10rem;
    height: 2rem;
    margin: 0 auto;
    background: none;
    border: 2px solid black;
    border-radius: 15px;
    text-transform: uppercase;

    &:hover {
      border: 2px solid #ff652f;
      background: #272727;
      color: #fff;
    }

    &:focus {
      outline: none;
    }
  }
`;

const Login = props => {
  console.log(props);
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  function handleInput(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  function login(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/api/login`, form)
      .then(response => {
        localStorage.setItem("token", response.data.payload);
        props.history.push("/bubbles");
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <LoginStyles>
      <div className="formContainer">
        <h1>Welcome to the Bubble App!</h1>
        <h3>Sign In</h3>
        <form onSubmit={login} className="login">
          <label htmlFor="username">
            Username
            <input
              value={form.username}
              type="text"
              name="username"
              onChange={handleInput}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              value={form.password}
              type="password"
              name="password"
              onChange={handleInput}
            />
          </label>
          <button type="submit">Log in</button>
        </form>
      </div>
    </LoginStyles>
  );
};

export default Login;
