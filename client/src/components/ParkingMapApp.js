// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import ParkingMap from "./ParkingMap";
import MapConfig from "../utils/config";
class ParkingMapApp extends Component {
    
  constructor(props){
    super(props)
    this.state = {bounds : MapConfig.bounds}
    this.setBounds = this.setBounds.bind(this);
  }

  setBounds(newBounds){
    this.setState({bounds : newBounds});
  }

  render(){
    return (
      <ParkingMap
        attribution={MapConfig.attribution}
        tileUrl = {MapConfig.tileUrl}
        center = {MapConfig.center}
        zoom = {MapConfig.intitialZoom}
        minZoom = {MapConfig.minZoom}
        maxZoom = {MapConfig.maxZoom}
        action = {this.setBounds}
      />
    )
  }
}

export default ParkingMapApp;