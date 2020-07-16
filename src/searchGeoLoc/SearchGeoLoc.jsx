import React from 'react';

import CurrentLoc from './CurrentLoc';
import SearchTown from './SearchTown';
import SelectTown from './SelectTown';
import MapComponent from './MapComponent';

const SearchGeoLoc = () => {
  return (
    <div className="row justify-content-center my-5">
      <div className="col-12 col-md-10 col-lg-8">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active tab_btn" data-toggle="tab" href="#current-loc" role="tab" aria-controls="current-loc" aria-selected="true">Aktualna lokalizacja</a>
            <a className="nav-item nav-link tab_btn" data-toggle="tab" href="#search-form" role="tab" aria-controls="search-form" aria-selected="false">Wyszukaj</a>
            <a className="nav-item nav-link tab_btn" data-toggle="tab" href="#select-form" role="tab" aria-controls="select-form" aria-selected="false">Wybierz</a>
            <a className="nav-item nav-link tab_btn" data-toggle="tab" href="#select-map" role="tab" aria-controls="select-map" aria-selected="false">Wybór na mapie</a>
          </div>
        </nav>
        <div className="tab-content pt-4" id="nav-tabContent">
          <CurrentLoc />

          <SearchTown />

          <SelectTown />

          <MapComponent />
        </div>
      </div>
    </div>
  );
}

export default SearchGeoLoc;