import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo, useRef } from "react";
import Map, { Popup, Source, Layer } from "react-map-gl";

import styled from "styled-components";

import buildingJson from "./utils/data/building.json";
import calculateCentroid from "./utils/calCentroid";

import Panel from "./Panel";
import Popover from "./Popover";
import { GlobalStyle } from "./styles/GlobalStyle";
import {
  accessibilityLayer,
  buildingLayer,
  highlightLayer,
} from "./layers/layers";

import { useRecoilState } from "recoil";
import { buildingState, layerState } from "./recoil/atoms";

const MapContainer = styled.div`
  position: relative;
  width: 99.5vw;
  height: 99.5vh;
`;

const mapboxAccessToken =
  "pk.eyJ1Ijoic2doYW4iLCJhIjoiY2szamxqbjZnMGtmbTNjbXZzamh4cng3dSJ9.GGv4GVVoZ811d6PKi54PrA";

function App() {
  const viewport = {
    latitude: 40.746676,
    longitude: -73.9901321,
    zoom: 12,
    transitionDuration: 1000,
  };
  const mapRef = useRef();
  const [building, setBuilding] = useRecoilState(buildingState);
  const [selectedLayer] = useRecoilState(layerState);

  const handleMapClick = (e) => {
    const features = e.features;
    if (features && features.length > 0) {
      const properties = features[0].properties;
      const coordinates = features[0].geometry.coordinates[0];
      const centroid = calculateCentroid(coordinates);
      setBuilding({ properties, centroid });
    } else {
      setBuilding(null);
    }
  };

  const filter = useMemo(
    () => ["in", "bin", building?.properties.bin || ""],
    [building]
  );

  return (
    <MapContainer>
      <GlobalStyle />
      <Map
        initialViewState={viewport}
        mapboxAccessToken={mapboxAccessToken}
        mapStyle="mapbox://styles/sghan/ck1ljdcmy16fc1cpg0f4qh3wu"
        onClick={handleMapClick}
        interactiveLayerIds={["building_accessibility", "building_json"]}
        ref={mapRef}
      >
        <Source type="geojson" data={buildingJson}>
          <Layer
            {...accessibilityLayer}
            layout={{
              visibility:
                selectedLayer === "accessibility" ? "visible" : "none",
            }}
          />
          <Layer
            {...buildingLayer}
            layout={{
              visibility: selectedLayer === "data1" ? "visible" : "none",
            }}
          />
          <Layer {...highlightLayer} filter={filter} />
        </Source>
        {building && (
          <Popup
            latitude={building.centroid[1]}
            longitude={building.centroid[0]}
            offset={[0, -10]}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setBuilding(null)}
            anchor="bottom"
          >
            <Popover properties={building.properties} />
          </Popup>
        )}
      </Map>
      <Panel />
    </MapContainer>
  );
}

export default App;
