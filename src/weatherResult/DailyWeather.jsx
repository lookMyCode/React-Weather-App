import React, { Fragment } from 'react';

import Context from '../Context';
import Card from './Card';

const DailyWeather = () => {
  const {dailyWeather: weather} = React.useContext(Context);

  return (
    <Fragment>
      {
        weather.map((item) => {
          const weatherDate = new Date (item.dt * 1000);
          const weatherTime = {
            day: '' + weatherDate.getDate(),
            month: ( '0' + (1 + weatherDate.getMonth()) ).slice(-2),
          };

          return (
            <Card 
              key={item.dt}
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
          )
        })
      }
    </Fragment>
  );
};

export default DailyWeather;