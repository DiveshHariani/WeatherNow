import './App.css';
import Navbar from './components/Navbar';
import Weather from './components/Weather';
import ThemeContext from './context/ThemeContext';
import { useContext } from 'react';

function App() {
  const { theme } = useContext(ThemeContext);
  console.log("In App.jsx", theme);
  return (
    <>
        <div className="App" style={theme}>
          <Navbar title="WeatherKnow"/>
          <Weather />
        </div>
    </>
  );
}

export default App;
