import React from 'react';
import Context from '../Context';

const CurrentLoc = () => {
  const {setGeoLoc} = React.useContext(Context);

  return (
    <div className="tab-pane fade show active" id="current-loc" role="tabpanel" aria-labelledby="current-loc-tab">
      <h3 className="text-center">Pogoda po twojej geolokacji</h3>
      <p className="text-center">Trzeba będzie twoja zgoda na nadanie twojej localizacji</p>
      <button type="button" className="btn btn-primary w-100" onClick={() => {
        if(!navigator.geolocation) {
          alert('Geolokacja nie jest dostępna w twojej przeglądarce');
        } else {
          navigator.geolocation.getCurrentPosition( pos => {
            setGeoLoc({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude
            });
          }, () => alert('Błąd uzyskania geolokacji') );
        }
      }}>Uzyskać informację o pogodzie</button>
    </div>
  );
}

export default CurrentLoc;