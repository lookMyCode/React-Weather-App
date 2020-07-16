import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import Context from '../Context';

const MapComponent = () => {
  const [coordinate, setCoordinate] = React.useState({
    position: [52, 19],
    zoom: 5,
  });
  let [isMarker, changeMarker] = React.useState(false);

  const {setGeoLoc} = React.useContext(Context);

  let mapRef = React.useRef();
  let markerRef = React.useRef();

  React.useEffect(() => {
    setInterval(() => {
      mapRef.current.leafletElement.invalidateSize();
    }, 500);
  }, []);

  React.useEffect(() => {
    isMarker && markerRef.current.leafletElement.openPopup();
  });

  let {position, zoom} = coordinate;

  const icon = new L.Icon({
    iconUrl: require('../img/marker-icon.png')
  });

  return (
    <div className="tab-pane fade" id="select-map" role="tabpanel" aria-labelledby="select-map-tab">
      <h3 className="text-center">Wybierz miasto na mapie</h3>
      <div className="w-100 map">
        <Map 
          ref={mapRef} 
          center={position} 
          zoom={zoom} 
          onClick={e => {
            const {lat, lng} = e.latlng;
            
            setCoordinate({
              position: [lat, lng],
              zoom: 10,
            });
            changeMarker(true);
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {isMarker && (
            <Marker 
              position={position} 
              icon={icon} 
              ref={markerRef}
            >
              <Popup>
                <p>Czy zgadza się miejscowość?</p>
                <button 
                  type="button" 
                  className="btn btn-primary w-100 mt-2" 
                  onClick={() => {
                    const [lat, lon] = coordinate.position;
                    setGeoLoc({lat, lon});
                  }}  
                >
                    Tak
                </button>
              </Popup>
            </Marker>)}
        </Map>
      </div>
    </div>
  );
}

export default MapComponent;