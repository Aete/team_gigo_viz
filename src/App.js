import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import buildingJson from "./utils/data/building.geojson";
import * as d3 from "d3";

const MapContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2doYW4iLCJhIjoiY2szamxqbjZnMGtmbTNjbXZzamh4cng3dSJ9.GGv4GVVoZ811d6PKi54PrA";

function App() {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [attr, setAttr] = useState("distance_from_station(ft)");

  useEffect(() => {
    const currentMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/sghan/ck1ljdcmy16fc1cpg0f4qh3wu",
      center: [-73.9901321, 40.746676],
      zoom: 13.5,
      attributionControl: false,
      antialias: true,
    });

    currentMap.addControl(
      new mapboxgl.AttributionControl({
        compact: true,
      })
    );

    currentMap.on("load", () => {
      currentMap.addSource("building_json", {
        type: "geojson",
        data: buildingJson,
      });

      currentMap.addLayer({
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

    currentMap.on("click", "building_json", function (e) {
      console.log(e.features[0].properties);
    });

    setMap(currentMap);
    return () => currentMap.remove();
  }, []);

  return <MapContainer ref={mapContainerRef}></MapContainer>;
}

export default App;
