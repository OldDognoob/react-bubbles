import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";
import styled from "styled-components";

const AppStyles = styled.div`
  margin: 0 auto;
  background: linear-gradient(
    230deg,
    #fff,
    #ff652f,
    #ff652f,
    #ffe400,
    #ffe400,
    #14a76c,
    #14a76c
  );
  height: 100vh;
`;

function App() {
  return (
    <AppStyles>
      <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute exact path="/bubbles" component={BubblePage}/>
      </div>
    </Router>
    </AppStyles>
    
  );
}

export default App;
