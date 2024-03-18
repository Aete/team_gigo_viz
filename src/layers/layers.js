export const buildingLayer = {
  id: "building_json",
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
    "fill-outline-color": "transparent",
  },
};

export const highlightLayer = {
  id: "building-highlighted",
  type: "fill",
  paint: {
    "fill-outline-color": "#fff",
    "fill-color": "transparent",
    "fill-opacity": 0.75,
  },
};
