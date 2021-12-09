// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

import Bounds from "./Bounds";

import ParkingTooltip from "./ParkingTooltip";

class ParkingMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      parkingArr: [],
      selected: null,

    }
  }


  async componentDidMount() {

    await this.fetchAll();

  }

  async componentDidUpdate(prevProps) {
    if (prevProps.bounds !== this.props.bounds) {
      await this.fetchAll();
    }
  }

  async fetchAll() {

    const response = await fetch("/api/polygon?neLat=" + this.props.bounds._southWest.lat
      + "&neLon=" + this.props.bounds._southWest.lng
      + "&swLon=" + this.props.bounds._northEast.lat
      + "&swLat=" + this.props.bounds._northEast.lng);

    if (response.ok) {

      const djson = await response.json();

      this.setState({
        parkingArr: djson,
      });
    }
  }

  getPosition() {
    if (this.state.selected !== null) {
      return [this.state.selected.geometry.coordinates[1],
        this.state.selected.geometry.coordinates[0]];
    }
  }

  popUp() {
    if (this.state.selected !== null) {

      return <Popup
        position={this.getPosition()}
        onClose={() => this.setState({ selected: null })}
      >
        <ParkingTooltip parking={this.state.selected} />
      </Popup >
    }

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
            {this.state.parkingArr.map((item, index) =>
              <CircleMarker
                key={index}
                color={"blue"}
                opacity={1}
                radius={5}
                weight={1}
                center={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
                eventHandlers={{
                  click: () => {
                    this.setState({ selected: item });
                  },
                }}
              />
            )}

          </MarkerClusterGroup>

          {this.popUp()}

          <Bounds action={this.props.action} />
        </MapContainer>
      </div>
    )
  }
}

export default ParkingMap;