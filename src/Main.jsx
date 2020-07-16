import React from 'react';
import PropTypes from 'prop-types';

import Context from './Context';
import SearchGeoLoc from './searchGeoLoc/SearchGeoLoc';
import WeatherResult from './weatherResult/WeatherResult';

const Main = ({match, history}) => {
  const {lat, lon} = match.params;

  const URL_PATH = 'https://api.openweathermap.org/data/2.5/onecall';
  const LANG = 'pl';
  const APP_ID = '49786cbc2073d4568bb0c7a4f3b59199';
  const UNITS = 'metric';

  const [geoLoc, setGeoLoc] = React.useState({
    lat: +lat || null,
    lon: +lon || null
  });

  const validWeatherFor = (w) => {
    if(w === 'current' || w === 'daily' || w === 'hourly')
      return w;
  };
  
  const [weatherFor, setWeatherFor] = React.useState( validWeatherFor(match.params.weatherFor) || 'current' );

  const [currentWeather, setCurrentWeather] = React.useState(null);
  const [hourlyWeather, setHourlyWeather] = React.useState(null);
  const [dailyWeather, setDailyWeather] = React.useState(null);

  React.useEffect( () => {
    const {lat, lon} = geoLoc;
    lat && lon && history.push(`/${lat},${lon}/${weatherFor}`, {});
  }, [geoLoc, weatherFor] );

  React.useEffect( () => {
    const {lat, lon} = geoLoc;
    lat && lon && fetch(`${URL_PATH}?lat=${lat}&lon=${lon}&lang=${LANG}&appid=${APP_ID}&units=${UNITS}`)
      .then(res => res.json())
      .then(res => {
        const {current, hourly, daily} = res;
        current && hourly && daily && (() => {
          setCurrentWeather(current);
          setHourlyWeather(hourly);
          setDailyWeather(daily);
        })();
      })
      .catch(err => {
        throw err;
      });
  }, [geoLoc]);

  return (
    <Context.Provider value={{
      setGeoLoc,
      weatherFor,
      setWeatherFor,
      currentWeather,
      hourlyWeather,
      dailyWeather
    }}>
      <main className="container">
        <SearchGeoLoc />
        {currentWeather && hourlyWeather && dailyWeather && <WeatherResult />}
      </main>
    </Context.Provider>
  );
}

Main.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Main;