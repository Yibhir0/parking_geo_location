import {
  useMapEvents,
} from "react-leaflet";

//react-leaflet hook
function Bounds(props) {
  const mapEvents = useMapEvents({
    "moveend": () => {
      console.log(mapEvents.getBounds());
      props.action(mapEvents.getBounds());
    },
    "zoom": () => {
      props.action(mapEvents.getBounds());
    },
  });
  return null
}

export default Bounds;

