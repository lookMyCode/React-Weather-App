import React from 'react';

import Context from '../Context';
import Card from './Card';

const CurrentWeather = () => {
  const {currentWeather: weather} = React.useContext(Context);

  const weatherDate = new Date (weather.dt * 1000);
  const weatherTime = {
    min: ('0' + weatherDate.getMinutes()).slice(-2),
    hour: ('0' + weatherDate.getHours()).slice(-2),
  };

  return (
    <Card 
      weatherTime={weatherTime} 
      weather={weather.weather[0]} 
      temp={weather.temp} 
      feelsLike={weather.feels_like} 
      pressure={weather.pressure} 
      windSpeed={weather.wind_speed}
      windGust={weather.wind_gust} 
      humidity = {weather.humidity} 
      rain={weather.rain} 
      snow={weather.snow}
    />
  );
};

export default CurrentWeather;