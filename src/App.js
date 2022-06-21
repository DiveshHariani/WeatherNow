import './App.css';
import Navbar from './components/Navbar';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <Navbar title="WeatherKnow"/>
      <Weather />
    </div>
  );
}

export default App;
