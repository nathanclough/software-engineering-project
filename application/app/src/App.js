import logo from './logo.png';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import { BrowserRouter, Route } from "react-router-dom";
import React, { useState } from 'react';



function App() {
  // Handles authintication for api calls 
  const [view, setView] = useState("Unauthorized");
  
  return (
    <div>
    <BrowserRouter>
      <Route path="/" exact component={Login} />  
      <Route path="/register"  exact component={Register} />
    </BrowserRouter>
    </div>

  );
}

export default App;
