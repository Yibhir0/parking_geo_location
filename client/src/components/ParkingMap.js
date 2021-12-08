// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

class ParkingMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      points: [],
      selectedSreet: null,

    }
  }

  async componentDidMount() {
    this.setState({ points: await this.fetchAll() })

  }

  async fetchAll() {
    const response = await fetch("/api");
    if (response.ok) {
      const allData = await response.json();
      console.log(allData);
      return allData;
    }
    return [];


  }

  render() {
    return (
      <div>
        <MapContainer
          center={this.props.center}
          zoom={this.props.zoom}
          minZoom={this.props.minZoom}
          maxZoom={this.props.maxZoom}
          zoomControl={false}
          updateWhenZooming={false}
          updateWhenIdle={true}
          preferCanvas={true}
          style={{
            width: "100%",
            position: "absolute",
            top: 0,
            bottom: 0,
            zIndex: -1
          }}
        >
          <TileLayer
            url={this.props.tileUrl}
            attribution={this.props.attribution} />
          <MarkerClusterGroup
            spiderfyOnMaxZoom={false}
            zoomToBoundsOnClick={true}
            showCoverageOnHover={true}
            removeOutsideVisibleBounds={false}
            disableClusteringAtZoom={this.props.maxZoom}
          >
            {this.state.points.map((item, index) =>
              <CircleMarker
                key={index}
                color={"red"}
                opacity={1}
                radius={5}
                weight={1}
                center={[45.5017, -73.5673]}
              // center={item.geometry.coordinates}
              // eventHandlers={{
              //   click: () => {
              //     this.setState({ selected: item });
              //   }
              // }} 
              />
            )}

          </MarkerClusterGroup>
        </MapContainer>
      </div>
    )
  }

}

export default ParkingMap;