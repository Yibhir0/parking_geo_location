

/**
 * Map configuration variables
 */

const MapConfig = {

  // eslint-disable-next-line max-len
  attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
  tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  center: [45.5017, -73.5673],
  bounds: [
    [-73.9890, 45.9111],
    [-73.1200, 45.2222]
  ],
  minZoom: 1,
  maxZoom: 18,
  intitialZoom: 14
}

export default MapConfig;

