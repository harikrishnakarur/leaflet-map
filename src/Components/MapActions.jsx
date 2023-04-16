import styled from "@emotion/styled";
import LocationMarker from "./LocationMarker";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
const MapActions = ({ routePolyline, setIsReverse }) => {
  const Actions = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 10000;
  `;
  const map = useMap();
  const locateMe = (e) => {
    e.preventDefault();
    map.locate();
  };
  const fitMap = () => {
    const bounds = routePolyline?.getBounds();
    bounds && map.fitBounds(bounds);
  };

  return (
    <>
      <LocationMarker />
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control leaflet-bar">
          <div>
            <button onClick={locateMe}>Locate</button>
          </div>
          <div>
            <button onClick={fitMap}>Fit Route</button>
          </div>
          <div>
            <button onClick={() => setIsReverse((s) => !s)}>
              Reverse Route
            </button>
          </div>
        </div>
      </div>
      {/* <Actions>
        <button onClick={locateMe}>Locate</button>
        <button onClick={fitMap}>Fit Route</button>
        <button onClick={() => setIsReverse((s) => !s)}>Reverse Route</button>
      </Actions> */}
    </>
  );
};

export default MapActions;
