import React from 'react';
import moment from 'moment';

const Data = ({ data, handleClick }) => (
  <div className="container">
    <div className="row test">
      {data.map(event => (
        <button
          key={event.ncLayerId}
          onClick={() => handleClick(event.layerDateEpoch)}
          className="col-xs-1 bull"
          type="button"
        >
          {moment.unix(event.layerDateEpoch).format('MM/DD')}
          <br />
          {moment.unix(event.layerDateEpoch).format('YYYY')}
        </button>
      ))}
    </div>
  </div>
);

export default Data;
