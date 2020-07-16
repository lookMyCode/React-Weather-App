import React from 'react';

import Context from '../Context';
import Card from './Card';

const HourlyWeather = () => {
  const {hourlyWeather: weather} = React.useContext(Context);

  return (
    <div className="container-fluid">
      <div className="row">

        {
          weather.map((item) => {
            const weatherDate = new Date (item.dt * 1000);
            const weatherTime = {
              min: ('0' + weatherDate.getMinutes()).slice(-2),
              hour: ('0' + weatherDate.getHours()).slice(-2),
              day: '' + weatherDate.getDate(),
              month: ( '0' + (1 + weatherDate.getMonth()) ).slice(-2),
            };

            return (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3 hourly_card" key={item.dt}>
                <Card 
                  weatherTime={weatherTime} 
                  weather={item.weather[0]} 
                  temp={item.temp} 
                  feelsLike={item.feels_like} 
                  pressure={item.pressure} 
                  windSpeed={item.wind_speed}
                  windGust={item.wind_gust} 
                  humidity = {item.humidity} 
                  rain={item.rain} 
                  snow={item.snow}
                />
              </div>
            )
          })
        }
        
      </div>
    </div>
  );
};

export default HourlyWeather;