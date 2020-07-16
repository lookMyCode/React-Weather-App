import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Context from '../Context';

import weatherIcons from './weatherIcons';
 
const Card = ({ weatherTime: {month, day, hour, min}, weather, temp, feelsLike,pressure, windSpeed, windGust, humidity, rain, snow }) => {
  const {weatherFor} = React.useContext(Context);

  let titleText;
  let tempText;
  let tempTableHtml;

  if(month && day && hour && min) {
    titleText = `${hour}:${min} ${day}.${month}`;
  } else if(month && day) {
    titleText = `${day}.${month}`;
  } else if(hour && min) {
    titleText = `${hour}:${min}`;
  } else {
    titleText = 'Błąd uzyskania czasu';
    throw new Error('Error: Can not getting time');
  }

  if(typeof temp === 'number') {
    tempText = `${Math.round(temp)} ${String.fromCharCode(176)}C`;
  } else if(typeof temp === 'object') {
    tempText = <Fragment>
      <span className="mr-5">{Math.round(temp.max)} {String.fromCharCode(176)}C</span>
      <span className="text-secondary">{Math.round(temp.min)} {String.fromCharCode(176)}C</span>
    </Fragment>;

    tempTableHtml = <div className="container-fluid my-3">
      <div className="row">
        <div className="col-3 temp_desc">
          <h6 className="text-center">Noc</h6>
          <p className="text-center font-weight-bold" title="Temperatura">{Math.round(temp.night)} {String.fromCharCode(176)}C</p>
          <p className="text-center" title="Odczuwalna">{Math.round(feelsLike.night)} {String.fromCharCode(176)}C</p>
        </div>
        <div className="col-3 temp_desc">
          <h6 className="text-center">Ranek</h6>
          <p className="text-center font-weight-bold" title="Temperatura">{Math.round(temp.morn)} {String.fromCharCode(176)}C</p>
          <p className="text-center" title="Odczuwalna">{Math.round(feelsLike.morn)} {String.fromCharCode(176)}C</p>
        </div>
        <div className="col-3 temp_desc">
          <h6 className="text-center">Dzień</h6>
          <p className="text-center font-weight-bold" title="Temperatura">{Math.round(temp.day)} {String.fromCharCode(176)}C</p>
          <p className="text-center" title="Odczuwalna">{Math.round(feelsLike.day)} {String.fromCharCode(176)}C</p>
        </div>
        <div className="col-3 temp_desc">
          <h6 className="text-center">Wieczór</h6>
          <p className="text-center font-weight-bold" title="Temperatura">{Math.round(temp.eve)} {String.fromCharCode(176)}C</p>
          <p className="text-center" title="Odczuwalna">{Math.round(feelsLike.eve)} {String.fromCharCode(176)}C</p>
        </div>
      </div>
    </div>
  }

  return (
    <div className={weatherFor === 'daily' ? 'card my-3' : 'card'}>
      <h5 className="card-title text-center my-3">Stanem na {titleText}</h5>
      <img src={weatherIcons[weather.icon]} className="card-img-top weather_img" title={weather.description} alt={weather.description} />
      <div className="card-body">
        <h5 className="card-title text-center">{tempText}</h5>
        {tempTableHtml}
        {typeof temp === 'number' && <p className="card-text">Odczuwalna: {Math.round(feelsLike)} &deg;C</p>}
        <p className="card-text">Ciśnienie: {pressure} hPa</p>
        <p className="card-text">Wiatr: {Math.round(windSpeed * 10) / 10} km/h</p>
        {windGust && <p className="card-text">Podmuch wiatru: {windGust} km/h</p>}
        <p className="card-text">Wilgotność: {humidity} %</p>
        {typeof rain === 'object' && rain['1h'] && <p className="card-text">Opad deszczu: {rain['1h']} mm</p>}
        {typeof rain === 'number' && <p className="card-text">Opad deszczu: {rain} mm</p>}
        {typeof snow === 'object' && snow['1h'] && <p className="card-text">Opad deszczu: {snow['1h']} mm</p>}
        {typeof snow === 'number' && <p className="card-text">Opad deszczu: {snow} mm</p>}
      </div>
    </div>
  );
};

Card.propTypes = { 
  weatherTime: PropTypes.objectOf(PropTypes.string),
  weather: PropTypes.shape({
    description: PropTypes.string,
    icon: PropTypes.string.isRequired
  }).isRequired,
  temp: PropTypes.oneOfType([
    PropTypes.number, PropTypes.objectOf(PropTypes.number)
  ]).isRequired,
  feelsLike: PropTypes.oneOfType([
    PropTypes.number, PropTypes.objectOf(PropTypes.number)
  ]).isRequired,
  pressure: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  windGust: PropTypes.number,
  humidity: PropTypes.number.isRequired,
  rain: PropTypes.oneOfType([
    PropTypes.number, PropTypes.objectOf(PropTypes.number)
  ]),
  snow: PropTypes.oneOfType([
    PropTypes.number, PropTypes.objectOf(PropTypes.number)
  ]),
};

export default Card;