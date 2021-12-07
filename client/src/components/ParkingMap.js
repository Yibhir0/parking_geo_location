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

class ParkingMap extends Component {

  constructor(props){
    super(props)
    this.state = {
      points : [],
      selected : null, 
    }
  }

  render() {
    return (
      <MapContainer
        center = {this.props.center}
        zoom = {this.props.zoom}
        minZoom = {this.props.minZoom}
        maxZoom = {this.props.maxZoom}
        zoomCntrol = {false}
        updateWhenZooming = {false}
        updateWhenIdle = {true}
        preferCanvas = {true}
        style = {{
          width: "100%",
          position: "absolute",
          top: 0,
          bottom: 0,
          zIndex: -1
        }}

      >
        <TileLayer />
        <MarkerClusterGroup>
         
          <CircleMarker />
        </MarkerClusterGroup>
      </MapContainer>
    )
  }

}

export default ParkingMap;