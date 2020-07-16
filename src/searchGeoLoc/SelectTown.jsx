import React from 'react';

import Context from '../Context';

import polishTowns from '../polish_towns';

const SelectTown = () => {
  let [regionVal, setRegionVal] = React.useState('');
  let [towns, setTowns] = React.useState([]);
  let [selectedTown, setSelectedTown] = React.useState('');

  const {setGeoLoc} = React.useContext(Context);

  React.useEffect(() => {
    let sectedRegion = polishTowns.find(region => region.region_name === regionVal);
    sectedRegion && setTowns(sectedRegion.cities);
  }, [regionVal]);
   

  return (
    <div className="tab-pane fade" id="select-form" role="tabpanel" aria-labelledby="select-form-tab">
      <h3 className="text-center">Wybrać miasto</h3>
      <div className="input-group mb-3">
        <select className="custom-select" id="inputGroupSelect1" 
          value={regionVal} 
          onChange={({ target: {value} }) => {
            setRegionVal(value);
          }}
        >
          <option selected>Wybierz region</option>
          {
            polishTowns.map( ({region_name}) => {
              return <option 
                key={region_name} 
                value={region_name}
              >
                {region_name}
              </option>
            })
          }
        </select>
      </div>

      {
        towns.length > 0 && (
        <div className="input-group mb-3">
          <select className="custom-select" id="inputGroupSelect2"
            value={selectedTown} 
            onChange={(e) => {
              setSelectedTown(e.target.value);
            }}
          >
            <option selected>Wybierz miasto</option>
            {
              towns.map( ({text_simple}) => {
                return <option 
                  key={text_simple} 
                  value={text_simple}
                >
                  {text_simple}
                </option>
              } )
            }
          </select>
          <div className="input-group-append">
            <label className="input-group-text" htmlFor="inputGroupSelect2" onClick={() => {
              if(selectedTown) {
                const city = towns.find( town => town.text_simple = selectedTown );
                setGeoLoc({
                  lat: +city['lat'],
                  lon: +city['lon']
                });
                setRegionVal('');
                setTowns([]);
                setSelectedTown('');
              }
            }}>
              Wybrać
            </label>
          </div>
        </div>
        )
      }
      
    </div>
  );
}

export default SelectTown;