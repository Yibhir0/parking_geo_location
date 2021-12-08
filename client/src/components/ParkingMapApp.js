// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import ParkingMap from "./ParkingMap";
import MapConfig from "../utils/config";
class ParkingMapApp extends Component {
    

  render(){
    return (
      <ParkingMap
        attribution={MapConfig.attribution}
        tileUrl = {MapConfig.tileUrl}
        center = {MapConfig.center}
        zoom = {MapConfig.intitialZoom}
        minZoom = {MapConfig.minZoom}
        maxZoom = {MapConfig.maxZoom}
        
      />
    )
  }
}

export default ParkingMapApp;