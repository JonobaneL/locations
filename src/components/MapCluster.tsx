import { Layer, Source } from "react-map-gl";
import { PointParams } from "../models/paramTypes";
import type { FeatureCollection } from "geojson";
import { clusterCountLayer, clusterLayer } from "../data/layersConfigs";
type ClusterProps = {
  marks: PointParams[];
};

const MapCluster = ({ marks }: ClusterProps) => {
  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: marks.map((item) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [item.location.lng, item.location.lat],
        },
        properties: {
          cluster: false,
          id: item.id,
          category: "all",
        },
      };
    }),
  };
  return (
    <Source
      id="my-data"
      type="geojson"
      data={geojson}
      cluster={true}
      clusterRadius={75}
    >
      <Layer {...clusterLayer} />
      <Layer {...clusterCountLayer} />
    </Source>
  );
};

export default MapCluster;
