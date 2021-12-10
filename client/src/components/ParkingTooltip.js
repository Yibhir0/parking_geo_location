// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";

/**
 * Tooltip class - contains the whole render of tooltip
 */
class ParkingTooltip extends Component {

  render() {
    return (
    //Display the tooltip with the props given - Shows locations, available hours and places
      <div>
        <h2>{this.props.parking.LOCATION}</h2>
        <p>Hours: {this.props.parking.HOURS}</p>
        <p>Number Of Places: {this.props.parking.NBR_PLA_I}</p>
      </div>
    )
  }
}

export default ParkingTooltip;