import React from 'react';

import Context from '../Context';
import CurrentWeather from './CurrentWeather';
import HourlyWeather from './HourlyWeather';
import DailyWeather from './DailyWeather';

const WeatherResult = () => {
  const {weatherFor, setWeatherFor} = React.useContext(Context);

  return (
    <div className="row justify-content-center my-5">
      <div className="col-12 col-md-10">
        <div className="w-100 mb-3">
          <button type="button" 
            className={weatherFor === 'current' ? 'btn btn-primary mx-1' : 'btn btn-link mx-1'} 
            onClick={() => {
              setWeatherFor('current')
            }}
          >
            Aktualna
          </button>
          <button type="button" 
            className={weatherFor === 'hourly' ? 'btn btn-primary mx-1' : 'btn btn-link mx-1'} 
            onClick={() => {
              setWeatherFor('hourly')
            }}
          >
            Godzinowa
          </button>
          <button type="button" 
            className={weatherFor === 'daily' ? 'btn btn-primary mx-1' : 'btn btn-link mx-1'} 
            onClick={() => {
              setWeatherFor('daily')
            }}
          >
            Tydzień
          </button>
        </div>
        
        <div className="w-100">
          {weatherFor === 'current' && <CurrentWeather />}
          {weatherFor === 'hourly' && <HourlyWeather />}
          {weatherFor === 'daily' && <DailyWeather />}
        </div>
      </div>
    </div>
  );
}

export default WeatherResult;