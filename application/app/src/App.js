import logo from './logo.png';
import './App.css';
import Login from './Components/Login';
function App() {
  return (
    <div>
        <img src={logo} className="App-logo" alt="logo" />   
        <Login/>
    </div>

  );
}

export default App;
