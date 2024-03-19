export const accessibilityLayer = {
  id: "building_accessibility",
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
    "fill-outline-color": "#212121",
  },
};

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
      "#f44336",
    ],
    "fill-opacity": 0.3,
    "fill-outline-color": "#212121",
  },
};

export const highlightLayer = {
  id: "building-highlighted",
  type: "line",
  paint: {
    "line-color": "#fff",
    "line-width": 3,
  },
};
