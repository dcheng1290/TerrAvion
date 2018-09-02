import React, { Component } from 'react';
import { Map, TileLayer, LayersControl } from 'react-leaflet';
import axios from 'axios';
import moment from 'moment';
import Data from './Data';

const { Overlay, BaseLayer } = LayersControl;

const apiUrl = 'https://api2.terravion.com';
const accessToken = '2e68cee0-b2fd-4ef5-97f6-8e44afb09ffa';
const userId = '5bad4dfa-7262-4a0a-b1e5-da30793cec65';
const zoomLevel = 15;
const oneDayEpoch = 24 * 60 * 60;

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      mapCenter: [38.54058, -121.877271],
      epochStart: '',
      epochEnd: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSecond = this.handleSecond.bind(this);
  }

  componentDidMount() {
    this.test();
  }

  /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
  test() {
    const { data } = this.state;
    axios
      .get(
        'https://api2.terravion.com/layers/getLayersFromBlockId?blockId=48ed28ca-d272-4d1f-bfe0-cb95b61eecbc&access_token=2e68cee0-b2fd-4ef5-97f6-8e44afb09ffa'
      )
      .then(response => {
        const dataInfo = response.data.reverse();
        this.setState({
          epochStart: dataInfo[0].layerDateEpoch - 24000,
          epochEnd: dataInfo[0].layerDateEpoch + 24000,
          data: [...data, ...dataInfo.splice(0, 10)],
        });
      })
      .catch(err => console.warn(err));
  }

  handleClick(layerDateEpoch) {
    this.setState({
      epochStart: layerDateEpoch - oneDayEpoch,
      epochEnd: layerDateEpoch + oneDayEpoch,
    });
  }

  handleSecond() {
    this.setState({
      epochStart: 1508865698.041,
      epochEnd: 1509038498.041,
    });
  }

  render() {
    const { data, mapCenter, epochStart, epochEnd } = this.state;
    console.log({ epochStart, epochEnd });
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
              <TileLayer attribution="hello" url={tileUrlTemplate} tms="true" />
            </Overlay>
            <Overlay name="test2">
              <TileLayer
                attribution="hello"
                url={
                  'https://api2.terravion.com/users/5bad4dfa-7262-4a0a-b1e5-da30793cec65/{z}/{x}/{y}.png?epochStart=1456200627&epochEnd=1456632627&access_token=2e68cee0-b2fd-4ef5-97f6-8e44afb09ffa&product=NC'
                }
                tms="true"
              />
            </Overlay>
          </LayersControl>
          <Data data={data} handleClick={this.handleClick} />
        </Map>
      </div>
    );
  }
}

export default Maps;
