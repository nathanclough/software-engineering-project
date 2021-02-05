import logo from './logo.png';
import './App.css';
import Login from './Components/Login';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Login/>
        </p>
        
      </header>
    </div>
  );
}

export default App;
