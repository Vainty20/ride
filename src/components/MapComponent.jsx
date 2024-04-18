import React, { useState, useEffect } from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
const containerStyle = { width: "100%", height: "600px", borderRadius: "20px" };
function MapComponent({ pickupCoords, dropoffCoords, isLoaded }) {
  const [map, setMap] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: pickupCoords[0], lng: pickupCoords[1] },
          destination: { lat: dropoffCoords[0], lng: dropoffCoords[1] },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setRoutePath(result.routes[0].overview_path);
          }
        }
      );
    }
  }, [isLoaded, pickupCoords, dropoffCoords]);
  const onLoad = (map) => {
    setMap(map);
  };
  const onUnmount = () => {
    setMap(null);
  };
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: pickupCoords[0], lng: pickupCoords[1] }}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {routePath.length > 0 && (
        <Polyline
          path={routePath}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1,
            strokeWeight: 3,
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}
export default React.memo(MapComponent);
