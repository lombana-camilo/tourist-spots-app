import { FC, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { SpotDocument } from "../../store/api/spotsApiSlice";
import PlaceIcon from "@mui/icons-material/Place";
import { Button, Typography } from "@mui/material";

export const MapBox: FC<{ spot: SpotDocument }> = ({ spot }) => {
  const [viewport, setViewport] = useState({
    latitude: spot.geometry.coordinates[1],
    longitude: spot.geometry.coordinates[0],
    zoom: 10,
  });
  const [isSelected, setIsSelected] = useState<null | boolean>(null);

  console.log({ isSelected });
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
        <Button onClick={() => setIsSelected(true)}>
          <PlaceIcon color="error" />
        </Button>
      </Marker>
      {isSelected && (
        <Popup
          latitude={spot.geometry.coordinates[1]}
          longitude={spot.geometry.coordinates[0]}
          anchor="bottom-left"
          closeOnClick={false}
          onClose={() => setIsSelected(false)}
        >
          <Typography variant="h6" fontSize={14}>{spot.title}</Typography>
        </Popup>
      )}
    </Map>
  );
};
