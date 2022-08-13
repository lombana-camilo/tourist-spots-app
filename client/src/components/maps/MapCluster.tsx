import { FC, useRef, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import { Map, Source, Layer, Marker, Popup } from "react-map-gl";

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";
import type { MapRef } from "react-map-gl";
import type { GeoJSONSource } from "react-map-gl";
import { get } from "lodash";
import { SpotDocument } from "../../store/api/spotsApiSlice";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const MAPBOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_TOKEN;

export const MapCluster: FC<{ spots: SpotDocument[] }> = ({ spots }) => {
  interface Features {
    type: "Feature";
    properties: any;
    geometry: { type: "Point"; coordinates: number[] };
  }
  const features: Features[] = spots.map((spot) => ({
    geometry: spot.geometry,
    type: "Feature",
    properties: { ...spot },
  }));
  interface PopupInfo {
    coordinates: number[];
    title: string;
    description: string;
    id: string;
  }

  const [popupInfo, setPopupInfo] = useState<null | PopupInfo>(null);
  const mapRef = useRef<MapRef>(null);

  const onClick = (event: mapboxgl.MapLayerMouseEvent) => {
    const feature = get(event, "features[0]");
    // Zoom feature
    if (feature.layer.id === "clusters") {
      const mapboxSource = get(mapRef, "current")?.getSource(
        "spots"
      ) as GeoJSONSource;

      console.log({ mapboxSource });
      const clusterId = feature.properties.cluster_id;
      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        get(
          mapRef,
          "current.easeTo"
        )({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500,
        });
      });
    }
    // PopUp Feature
   if (feature.layer.id === "unclustered-point"){
         const properties = feature.properties;
         setPopupInfo({
            title: properties.title,
            coordinates: JSON.parse(properties.geometry).coordinates,
            id: properties._id,
            description: properties.description,
         });
      }
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 4.547871,
          longitude: -73.460127,
          zoom: 4,
        }}
        style={{ height: "40vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[
          clusterLayer.id as string,
          unclusteredPointLayer.id as string,
        ]}
        onClick={onClick}
        ref={mapRef}
      >
        {popupInfo && (
          <Popup
            latitude={popupInfo.coordinates[1]}
            longitude={popupInfo.coordinates[0]}
            anchor="bottom-left"
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <Link to={`/spots/${popupInfo.id}`}>{popupInfo.title}</Link>
            <Typography fontSize={17}>{popupInfo.description.substring(0,45)}...</Typography>
          </Popup>
        )}

        <Source
          id="spots"
          type="geojson"
          data={{ features: features, type: "FeatureCollection" }}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </>
  );
};
