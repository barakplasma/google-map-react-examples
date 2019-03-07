import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// examples:
import GoogleMap from '../components/GoogleMap';

// consts
import LOS_ANGELES_CENTER from '../const/la_center';

function getRandomArbitrary(min, max) { return Math.random() * (max - min) + min; }
const addMore = (setState) => {
  const newFakeReadings = (x) => {
    const newReadings = [];

    for (let i = 0; i <= x; i++) {
      newReadings.push({
        weight: getRandomArbitrary(0.1, 4),
        lat: getRandomArbitrary(37.6, 37.8),
        lng: getRandomArbitrary(-122.44, -122.54),
      });
    }
    return newReadings;
  };
  setState({ positions: newFakeReadings(10) });
};

class AnimatedHeatmap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positions: [],
    };
  }

  componentDidMount() {
    fetch('places.json')
      .then(response => response.json())
      .then((data) => {
        const { results } = data;
        const positions = results.map(place => ({
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          weight: Math.floor(Math.random() * Math.floor(5)),
        }));
        this.setState({ positions });
        setInterval(() => addMore(this.setState.bind(this)), 1000);
      });
  }

  render() {
    const { positions } = this.state;

    const heatmapData = {
      positions,
      options: {
        radius: 20,
        opacity: 1,
      },
    };

    return (
      <Fragment>
        {!isEmpty(positions) && (
        <GoogleMap
          defaultZoom={10}
          defaultCenter={LOS_ANGELES_CENTER}
          heatmap={heatmapData}
          bootstrapURLKeys={{
                key: process.env.REACT_APP_MAP_KEY,
                libraries: ['visualization'],
              }}
        />
          )}
      </Fragment>
    );
  }
}

export default AnimatedHeatmap;
