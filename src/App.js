import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useMemo } from "react";
import Map, { Popup, Source, Layer } from "react-map-gl";

import styled from "styled-components";

import buildingJson from "./utils/data/building.geojson";
import calculateCentroid from "./utils/calCentroid";

import Panel from "./Panel";
import Popover from "./Popover";
import { GlobalStyle } from "./styles/GlobalStyle";
import {
  accessibilityLayer,
  buildingLayer,
  highlightLayer,
} from "./layers/layers";

const MapContainer = styled.div`
  position: relative;
  width: 99.5vw;
  height: 99.5vh;
`;

const mapboxAccessToken =
  "pk.eyJ1Ijoic2doYW4iLCJhIjoiY2szamxqbjZnMGtmbTNjbXZzamh4cng3dSJ9.GGv4GVVoZ811d6PKi54PrA";

function App() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState("accessibility");

  const handleMapClick = (e) => {
    const features = e.features;
    if (features && features.length > 0) {
      const properties = features[0].properties;
      const coordinates = features[0].geometry.coordinates[0];
      const centroid = calculateCentroid(coordinates);
      setSelectedBuilding({ properties, centroid });
    } else {
      setSelectedBuilding(null);
    }
  };

  const clickedBuilding =
    (selectedBuilding && selectedBuilding.properties.bin) || "";

  const filter = useMemo(
    () => ["in", "bin", clickedBuilding],
    [clickedBuilding]
  );

  const handleLayerSelect = (e) => {
    e.preventDefault();
    setSelectedLayer(e.target.value);
  };

  return (
    <MapContainer>
      <GlobalStyle />
      <Map
        initialViewState={{
          latitude: 40.746676,
          longitude: -73.9901321,
          zoom: 12,
        }}
        mapboxAccessToken={mapboxAccessToken}
        mapStyle="mapbox://styles/sghan/ck1ljdcmy16fc1cpg0f4qh3wu"
        onClick={handleMapClick}
        interactiveLayerIds={["building_accessibility", "building_json"]}
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
        {selectedBuilding && (
          <Popup
            latitude={selectedBuilding.centroid[1]}
            longitude={selectedBuilding.centroid[0]}
            offset={[0, -10]}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedBuilding(null)}
            anchor="bottom"
          >
            <Popover properties={selectedBuilding.properties} />
          </Popup>
        )}
      </Map>
      <Panel handleSelect={handleLayerSelect} />
    </MapContainer>
  );
}

export default App;
