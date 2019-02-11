import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// components:
import Marker from '../components/Marker';

// examples:
import GoogleMap from '../components/GoogleMap';

// consts
import LOS_ANGELES_CENTER from '../const/la_center';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    fetch('places.json')
      .then(response => response.json())
      .then(data => this.setState({ places: data.results }));
  }

  render() {
    const { places } = this.state;
    const data = places.map(place => ({ lat: place.geometry.location.lat, lng: place.geometry.location.lng, weight: 4 }));
    const heatmapData = {positions: data, options: {
      radius: 20,
      opacity: 1,
    } }
    console.log(heatmapData);
    return (
      <Fragment>
        {!isEmpty(places) && (
          <GoogleMap
            defaultZoom={10}
            defaultCenter={LOS_ANGELES_CENTER}
            heatmapLibrary={true}
            heatmap={heatmapData}
          >
          </GoogleMap>
        )}
      </Fragment>
    );
  }
}

export default Heatmap;
