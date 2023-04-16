import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import "./styles.css";
import { MapContainer, TileLayer } from "react-leaflet";

import { useState } from "react";
import styled from "@emotion/styled";
import CustomMarker from "./CustomMarker";
import MapActions from "./MapActions";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const SideBar = styled.div`
  width: 300px;
  height: 500px;
  overflow: auto;
`;
const Container = styled.div`
  display: flex;
`;
const MapWrapper = styled.div`
  flex: 1;
`;

const Map = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [routeLatLngs, setRouteLatLngs] = useState([]);
  const [routePolyline, setRoutePolyline] = useState();
  return (
    <>
      <button onClick={() => setShowSidebar((s) => !s)}>
        Show/Hide Coordinates
      </button>
      <Container>
        {showSidebar && (
          <SideBar>
            {routeLatLngs.map((latLng) => (
              <div>
                {latLng[0]},{latLng[1]}
              </div>
            ))}
          </SideBar>
        )}
        <MapWrapper id="map">
          <MapContainer
            center={{ lat: 51.505, lng: -0.09 }}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CustomMarker
              setRouteLatLngs={setRouteLatLngs}
              setRoutePolyline={setRoutePolyline}
              isReverse={isReverse}
              routePolyline={routePolyline}
            />
            <MapActions
              routePolyline={routePolyline}
              setIsReverse={setIsReverse}
            />
          </MapContainer>
        </MapWrapper>
      </Container>
    </>
  );
};

export default Map;
