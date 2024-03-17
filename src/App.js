import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

import styled from "styled-components";

import buildingJson from "./utils/data/building.geojson";

import Panel from "./Panel";
import Popover from "./Popover";
import { GlobalStyle } from "./styles/GlobalStyle";

const MapContainer = styled.div`
  position: relative;
  width: 99.5vw;
  height: 99.5vh;

  & .mapboxgl-popup.mapboxgl-popup-anchor-bottom {
    position: absolute;
    z-index: 2;
    top: 0;
  }

  & .mapboxgl-control-container {
    position: absolute;
    bottom: 5px;
    left: 5px;
    z-index: 2;
    background-color: #ffffff66;
    display: flex;
    padding: 3px;
  }

  & .mapboxgl-control-container a {
    text-decoration: underline;
  }

  & .mapboxgl-ctrl.mapboxgl-ctrl-attrib {
    display: flex;
  }
`;

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2doYW4iLCJhIjoiY2szamxqbjZnMGtmbTNjbXZzamh4cng3dSJ9.GGv4GVVoZ811d6PKi54PrA";

function App() {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const [highlightedBuildingId, setHighlightedBuildingId] = useState(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/sghan/ck1ljdcmy16fc1cpg0f4qh3wu",
      center: [-73.9901321, 40.746676],
      zoom: 13.5,
      antialias: true,
    });

    map.current.resize();

    map.current.on("load", () => {
      map.current.addSource("building_json", {
        type: "geojson",
        data: buildingJson,
      });

      map.current.addLayer({
        id: "building_json",
        source: "building_json",
        type: "fill",
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "distance_from_station(ft)"],
            0,
            "#fff",
            300,
            "#2196f3",
          ],
          "fill-opacity": 0.3,
        },
      });
    });

    map.current.on("click", "building_json", function (e) {
      const properties = e.features[0].properties;
      const coordinates = e.features[0].geometry.coordinates[0][0];

      console.log(properties.index);

      const props = {
        possibilityOfSuccess: 80,
        appliedAlgorithm: "K-Nearest Neighbors",
        gtfsStopId: properties["GTFS Stop ID"],
        latitude: coordinates[0],
        longitude: coordinates[1],
      };

      const $popOver = document.createElement("div");

      const popOverRoot = ReactDOM.createRoot($popOver);
      popOverRoot.render(<Popover properties={props} />);

      new mapboxgl.Popup({ offset: [20, 0] })
        .setLngLat(coordinates)
        .setDOMContent($popOver)
        .addTo(map.current);

      setHighlightedBuildingId(properties.id);
    });

    map.current.on("mouseenter", "building_json", (e) => {
      map.current.getCanvas().style.cursor = "pointer";
      setHighlightedBuildingId(e.features[0].properties.id);
    });

    map.current.on("mouseleave", "building_json", () => {
      map.current.getCanvas().style.cursor = "";
      setHighlightedBuildingId(null);
    });

    return () => map.current.remove();
  }, []);

  return (
    <>
      <GlobalStyle />
      <MapContainer ref={mapContainerRef}>
        <Panel></Panel>
      </MapContainer>
    </>
  );
}

export default App;
