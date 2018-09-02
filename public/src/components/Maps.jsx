import React, { Component } from 'react';
import { Map, TileLayer, LayersControl } from 'react-leaflet';
import axios from 'axios';
import { apiUrl, accessToken, userId } from '../../config/dev';
import Data from './Data';

const { Overlay, BaseLayer } = LayersControl;

const oneDayEpoch = 24 * 60 * 60;

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      mapCenter: [38.54058, -121.877271],
      zoomLevel: 15,
      epochStart: '',
      epochEnd: '',
    };
    this.updateEpoch = this.updateEpoch.bind(this);
  }

  componentDidMount() {
    this.fetchLayers();
  }

  /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
  fetchLayers() {
    const { data } = this.state;
    axios
      .get(
        'https://api2.terravion.com/layers/getLayersFromBlockId?blockId=48ed28ca-d272-4d1f-bfe0-cb95b61eecbc&access_token=2e68cee0-b2fd-4ef5-97f6-8e44afb09ffa'
      )
      .then(response => {
        const dataInfo = response.data.reverse();
        this.setState({
          epochStart: dataInfo[0].layerDateEpoch - oneDayEpoch,
          epochEnd: dataInfo[0].layerDateEpoch + oneDayEpoch,
          data: [...data, ...dataInfo.splice(0, 10)],
        });
      })
      .catch(err => console.warn(err));
  }

  updateEpoch(layerDateEpoch) {
    this.setState({
      epochStart: layerDateEpoch - oneDayEpoch,
      epochEnd: layerDateEpoch + oneDayEpoch,
    });
  }

  render() {
    const { data, mapCenter, epochStart, epochEnd, zoomLevel } = this.state;
    const tileUrlTemplate = `${apiUrl}/users/${userId}/{z}/{x}/{y}.png?epochStart=${epochStart}&epochEnd=${epochEnd}&access_token=${accessToken}&product=NC`;

    return (
      <div className="container">
        <Map ref={this.map} center={mapCenter} zoom={zoomLevel}>
          <LayersControl position="topright">
            <BaseLayer checked name="test">
              <TileLayer
                url={
                  'https://api.tiles.mapbox.com/v2/cgwright.ca5740e5/{z}/{x}/{y}.jpg'
                }
              />
            </BaseLayer>
            <Overlay checked name="test1">
              <TileLayer
                attribution="TerrAvion"
                url={tileUrlTemplate}
                tms="true"
              />
            </Overlay>
          </LayersControl>
          <Data data={data} handleClick={this.updateEpoch} />
        </Map>
      </div>
    );
  }
}

export default Maps;
