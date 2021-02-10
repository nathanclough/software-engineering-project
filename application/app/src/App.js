import logo from './logo.png';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Agreement from './Components/Agreement';
import { BrowserRouter, Route } from "react-router-dom";


function App() {
  return (
    <div>
    <BrowserRouter>
      <Route path="/" exact component={Login} />  
      <Route path="/agreement" exact component={Agreement}/>
      <Route path="/register"  exact component={Register}/>
    </BrowserRouter>
    </div>

  );
}

export default App;
