import React from 'react';

import Context from '../Context';
import ListTownItem from './ListTownItem';

import polishTowns from '../polish_towns';

const SearchTown = () => {
  let [inputVal, setInputVal] = React.useState('');
  let [listTowns, setListTowns] = React.useState([]);

  const {setGeoLoc} = React.useContext(Context);

  const changeListTowns = val => {
    const list = [];
    polishTowns.map((item) => {
      const region = item.region_name;
      const {cities} = item;

      cities.filter((item) => {
        if(list.length >= 5)
          return;

        if( item['text_simple'].toLowerCase().indexOf( val.toLowerCase() ) !== -1 ) {
          list.push({
            region: region,
            town: item['text_simple'],
            id: item['id'],
            val
          });
        }
      });
    });
    setListTowns(list);
  };

  const selectTownItem = val => {
    setInputVal(val);
  };

  React.useEffect(() => {
    inputVal && changeListTowns(inputVal);
  }, [inputVal]);

  return (
    <div className="tab-pane fade" id="search-form" role="tabpanel" aria-labelledby="search-form-tab">
      <h3 className="text-center">Znajdź miasto</h3>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Wpisz nazwę miasta" aria-label="Wpisz nazwę miasta" 
        value={inputVal} 
        onChange={({ target: {value} }) => {
          setInputVal(value);   
        }}/>
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="button" id="button-addon2" 
          onClick={() => {
            const arr = inputVal.split(',');

            polishTowns.map( ({region_name, cities}) => {
              if( region_name.toLowerCase() === arr[1].trim().toLowerCase() ) {
                cities.map((item) => {
                  if(item['text_simple'].toLowerCase() === arr[0].trim().toLowerCase() ) {
                    setGeoLoc({
                      lat: +item.lat,
                      lon: +item.lon
                    });
                    setInputVal('');
                  }
                });
              }
            } );
          }}>Wybierz</button>
        </div>
      </div>
      <div className="list-group">
        {listTowns.map( ({id, town, region}) => {
          return <ListTownItem key={id} town={town} region={region} selectTownItem={selectTownItem} />
        } )}
      </div>
    </div>
  );
}

export default SearchTown;