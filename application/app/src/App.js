import Register from './Components/Register';
import Login from './Components/Login';
import { BrowserRouter, Route } from "react-router-dom";
import React, { useState } from 'react';
import Homepage from './Components/Homepage';



function App() {
  return (
    <div>
    <BrowserRouter>
      <Route path="/" exact component={Login} />  
      <Route path="/register"  exact component={Register} />
      <Route path="/homepage" exact component={Homepage} />
    </BrowserRouter>
    </div>

  );
}

export default App;
