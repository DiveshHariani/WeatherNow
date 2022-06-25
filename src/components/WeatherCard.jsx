import React from 'react';
import { useContext } from 'react';
import CloudImage from '../assets/cloudy.webp';
import RainImage from '../assets/rainy.webp';
import SunnyImage from '../assets/sunny.webp';
import ThemeContext from '../context/ThemeContext';

function WeatherCard(props) {

  const determineImage = (weather) => {
    if(weather === 'Rain') return RainImage;
    else    return CloudImage;
  }
  const { theme } = useContext(ThemeContext);

  let cardStyle = {
    width: "18em",
    ...theme
  }

  if(theme.mode === 'dark') {
    cardStyle["borderColor"] = "grey"
  }

  return (
    <div>
        <div className="card" style={cardStyle}>
            <img src={determineImage(props.weather)} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.day}/{props.month}/{props.year}</h5>
                <p className="card-text"><strong>Temperature: {props.temperature}</strong></p>
                <p className="card-text"><strong>Feels Like: {props.temperatureFeelsLike}</strong></p>
                <p>Weather: {props.weather}</p>
            </div>
        </div>
    </div>
  )
}

export default WeatherCard