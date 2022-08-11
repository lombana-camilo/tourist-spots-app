import { FC, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { SpotDocument } from "../../store/api/spotsApiSlice";
import PlaceIcon from '@mui/icons-material/Place';

export const MapBox: FC<{ spot: SpotDocument }> = ({ spot }) => {
  const [viewport, setViewport] = useState({
    latitude: spot.geometry.coordinates[1],
    longitude: spot.geometry.coordinates[0],
    zoom: 10,
  });

  return (
    <Map
      {...viewport}
      style={{ height: "40vh" }}
      mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      onMove={(e) => setViewport(e.viewState)}
    >
      <Marker
        latitude={spot.geometry.coordinates[1]}
        longitude={spot.geometry.coordinates[0]}
        anchor="bottom"
      >
            <PlaceIcon color="error"/>
      </Marker>
    </Map>
  );
};
