import L from "leaflet";
import "./styles.css";
import { useMapEvents, Marker } from "react-leaflet";
import polylineUtil from "polyline";

import { useEffect, useState } from "react";
function CustomMarker({
  setRouteLatLngs,
  setRoutePolyline,
  isReverse,
  routePolyline,
}) {
  const [markers, setMarkers] = useState([]);
  const map = useMapEvents({
    click(e) {
      if (markers.length < 2) setMarkers((markers) => [...markers, e.latlng]);
    },
  });

  const getCoordinatesInOrder = (markers, isReverse) => {
    if (isReverse) {
      return markers
        .map((m) => m.lng + "," + m.lat)
        .reverse()
        .join(";");
    }
    return markers.map((m) => m.lng + "," + m.lat).join(";");
  };

  useEffect(() => {
    routePolyline?.removeFrom(map);
  }, [isReverse]);

  useEffect(() => {
    console.log("markers,isReverse");
    if (markers.length > 1) {
      fetch(
        `http://router.project-osrm.org/route/v1/driving/${getCoordinatesInOrder(
          markers,
          isReverse
        )}?overview=full`
      )
        .then((res) => res.json())
        .then((res) => {
          const decodedPolyline = polylineUtil.decode(res.routes[0].geometry);
          let polylineDraw = L.polyline(decodedPolyline, {
            color: "red",
          }).addTo(map);
          setRouteLatLngs(decodedPolyline);
          setRoutePolyline(polylineDraw);
        });
    }
  }, [markers, isReverse]);

  return markers.length === 0
    ? null
    : markers.map((marker) => <Marker position={marker}></Marker>);
}

export default CustomMarker;
