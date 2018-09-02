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

// {
//   props.events.map(event => (
//     <tr key={event.date + event.description}>
//       <td>{event.date}</td>
//       <td>{event.description}</td>
//       <td>{event.category2}</td>
//     </tr>
//   ));
// }
