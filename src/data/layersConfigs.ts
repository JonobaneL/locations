import { LayerProps } from "react-map-gl";

export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "points",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#1e3a8a",
      20,
      "#f1f075",
      100,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 20, 30, 100, 40],
  },
} as LayerProps;
export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "points",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["Open Sans Bold"],
    "text-size": 14,
  },
  paint: {
    "text-color": "#ffffff",
  },
} as LayerProps;
